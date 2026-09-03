#!/usr/bin/env node
/**
 * 给 data/models.json 里托管在 Hugging Face 的条目补上硬规格。
 * **不调用大模型**，全部来自 HF API 和模型自己的 config.json，可核实、可复现。
 *
 *   node scripts/enrich-specs.mjs              # 只补还没有 specs 的
 *   node scripts/enrich-specs.mjs --refresh    # 全部重新拉一遍（下载量会变）
 *   node scripts/enrich-specs.mjs --dry-run
 *
 * 拿到的字段：
 *   参数总量（safetensors）、权重体积（usedStorage）、上下文长度（config.json）、
 *   MoE 专家数与每 token 激活专家数、架构名、精度、许可、语言、配套论文。
 *
 * 闭源模型（Claude / GPT / Gemini）在 HF 上没有权重，拿不到这些 —— 它们只保留
 * note 和官方链接。不要为了「看起来整齐」去猜闭源模型的参数量。
 */
import { paths, readJson, writeJson, parseArgs, log } from './lib/util.mjs';

const args = parseArgs();
const REFRESH = Boolean(args.refresh);
const DRY = Boolean(args['dry-run']);

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function get(url, retries = 4) {
  let last;
  for (let i = 0; i < retries; i++) {
    if (i) await new Promise((r) => setTimeout(r, 1500 * i));
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
        signal: AbortSignal.timeout(25000),
      });
      if (res.ok) return res;
      if (res.status === 404) return null; // 明确的「没有」，不重试
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

/** config.json 的字段名各家不统一，多处找 */
function readConfig(c) {
  const t = c.text_config ?? c;
  const pick = (...keys) => {
    for (const k of keys) {
      for (const src of [c, t]) {
        if (src?.[k] != null) return src[k];
      }
    }
    return null;
  };
  return {
    contextTokens: pick('max_position_embeddings', 'max_sequence_length', 'n_positions'),
    experts: pick('num_experts', 'n_routed_experts', 'num_local_experts', 'moe_num_experts'),
    expertsPerToken: pick('num_experts_per_tok', 'moe_topk', 'num_selected_experts'),
    architecture: c.model_type ?? c.architectures?.[0] ?? null,
    hiddenLayers: pick('num_hidden_layers'),
  };
}

const models = readJson(paths.models, []);
const hf = models.filter((m) => /^https:\/\/huggingface\.co\//.test(m.url));

log.step(`补全规格：${hf.length}/${models.length} 条托管在 Hugging Face`);
if (models.length - hf.length) {
  log.dim(`  另外 ${models.length - hf.length} 条是闭源模型，没有公开权重，跳过`);
}

let done = 0;
let skipped = 0;
let failed = 0;

for (const m of hf) {
  if (m.specs && !REFRESH) {
    skipped++;
    continue;
  }

  const repo = m.url.replace('https://huggingface.co/', '').replace(/\/$/, '');

  try {
    const res = await get(`https://huggingface.co/api/models/${repo}`);
    if (!res) {
      log.warn(`${repo}：仓库不存在（404）`);
      failed++;
      continue;
    }
    const j = await res.json();

    // config.json 不是每个仓库都有，没有就只填 API 那部分
    let cfg = {};
    try {
      const cr = await get(`https://huggingface.co/${repo}/raw/main/config.json`);
      if (cr) cfg = readConfig(await cr.json());
    } catch {
      /* 拿不到就算了，不影响其余字段 */
    }

    const params = j.safetensors?.total ?? null;
    // 按字节数最多的那种精度作为主精度
    const precision =
      Object.entries(j.safetensors?.parameters ?? {}).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    const specs = {
      params,
      weightsBytes: j.usedStorage ?? null,
      contextTokens: cfg.contextTokens ?? null,
      architecture: cfg.architecture ?? j.config?.model_type ?? null,
      experts: cfg.experts ?? null,
      expertsPerToken: cfg.expertsPerToken ?? null,
      precision,
      license: j.cardData?.license ?? null,
      languages: j.cardData?.language ?? null,
      modality: j.pipeline_tag ?? null,
      arxiv: (j.tags ?? []).find((t) => t.startsWith('arxiv:'))?.slice(6) ?? null,
      downloads: j.downloads ?? null,
      likes: j.likes ?? null,
      fetchedAt: new Date().toISOString().slice(0, 10),
    };

    // 全空就别塞一个没用的对象进去
    const useful = Object.entries(specs).filter(
      ([k, v]) => v != null && k !== 'fetchedAt',
    ).length;
    if (!useful) {
      log.warn(`${repo}：没有可用规格，跳过`);
      failed++;
      continue;
    }

    m.specs = specs;
    done++;

    const b = (n) => (n ? (n / 1e9).toFixed(1) + 'B' : '?');
    const g = (n) => (n ? (n / 1e9).toFixed(0) + 'GB' : '?');
    log.dim(
      `  ${repo.padEnd(42)} ${b(params).padStart(7)} ${g(specs.weightsBytes).padStart(8)} ` +
        `ctx ${specs.contextTokens ? (specs.contextTokens / 1024).toFixed(0) + 'K' : '?'}`,
    );
  } catch (err) {
    log.warn(`${repo}：${err.message}`);
    failed++;
  }
}

console.log();
log.ok(`补全 ${done} 条${skipped ? `，跳过 ${skipped} 条已有的` : ''}${failed ? `，${failed} 条失败` : ''}`);

if (DRY) {
  log.dim('  --dry-run，没有写入');
} else if (done) {
  writeJson(paths.models, models);
  log.dim('  已写回 data/models.json');
}
