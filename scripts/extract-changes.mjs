#!/usr/bin/env node
/**
 * 抓每个模型的官方公告正文，提取「这次到底更新了什么」，写进 data/models.json 的 changes 字段。
 *
 *   node scripts/extract-changes.mjs                    # 只处理 changes 为空的
 *   node scripts/extract-changes.mjs --only=seed-2-1    # 指定条目
 *   node scripts/extract-changes.mjs --org=Anthropic    # 指定厂商
 *   node scripts/extract-changes.mjs --refresh          # 全部重做
 *   node scripts/extract-changes.mjs --dry-run          # 只抓正文并打印，不调 API
 *
 * 为什么需要这一步：只有标题和日期，写出来就是「XX 的迭代版」这种废话。
 * 真正有用的是「新增了什么能力、在哪些基准上、上线到哪个产品」——
 * 这些都在公告正文里，抓下来就有，不抓就只能靠猜。
 *
 * 防幻觉的设计：
 *   1. 模型只看抓来的正文，提示词明令禁止补充任何外部知识
 *   2. 正文里没有的就输出空数组，宁可留白
 *   3. 结果写进 changes 后仍标为待人工核对 —— 它是提取，不是背书
 */
import { paths, readJson, writeJson, loadEnv, parseArgs, stripHtml, log } from './lib/util.mjs';
import { resolveProvider, complete, describeProvider } from './lib/llm.mjs';

loadEnv();

const args = parseArgs();
if (args.provider) process.env.LLM_PROVIDER = String(args.provider);
if (args.model) process.env.LLM_MODEL = String(args.model);

const REFRESH = Boolean(args.refresh);
const DRY = Boolean(args['dry-run']);
const ONLY = args.only ? String(args.only).split(',').map((s) => s.trim()) : null;
const ORG = args.org ? String(args.org) : null;
const LIMIT = args.limit ? Number(args.limit) : Infinity;
const CONCURRENCY = Number(args.concurrency ?? 3);

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
};

async function getText(url, retries = 3) {
  let last;
  for (let i = 0; i < retries; i++) {
    if (i) await new Promise((r) => setTimeout(r, 1500 * i));
    try {
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        redirect: 'follow',
        signal: AbortSignal.timeout(25000),
      });
      if (res.ok) return res.text();
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

/**
 * Hugging Face 的模型页是 JS 渲染的，正文抓不到 —— 但 README.md 有原始 markdown，
 * 那才是模型卡的真正内容。
 */
function sourceUrl(model) {
  const hf = model.url.match(/^https:\/\/huggingface\.co\/([^/]+\/[^/?#]+)/);
  return hf ? `https://huggingface.co/${hf[1]}/raw/main/README.md` : model.url;
}

/** 把网页压成纯文本，砍掉导航和页脚这类噪音 */
function toPlainText(html, isMarkdown) {
  if (isMarkdown) return html.replace(/\n{3,}/g, '\n\n').slice(0, 12000);

  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, '\n');

  const lines = body
    .split('\n')
    .map((l) => stripHtml(l, 100000).trim())
    .filter((l) => l.length > 1);

  // 相邻重复行（模板渲染常见）压成一行
  const out = [];
  for (const l of lines) if (out[out.length - 1] !== l) out.push(l);

  return out.join('\n').slice(0, 12000);
}

const SYSTEM = `你从一篇模型发布公告里提取「这次更新了什么」，供一份面向学生的 AI 周报使用。

铁律：

1. **只用给你的正文。** 不许补充任何你记忆里的信息。正文没写的参数、跑分、价格、发布时间，一律不许出现。
2. **要具体，不要套话。** 「能力全面提升」「性能更强」这类句子直接丢掉。要保留的是：具体新增了什么功能、在哪个具名基准上取得什么结果、支持了什么新模态或新语言、上下文或价格具体变成多少、上线到哪个产品或平台、具体的型号名称。
3. **保留数字和专有名词。** 基准名（如 GDPval、SWE-bench）、型号名（如 Doubao-Seed-2.1-Pro）、具体数值都要原样保留。
4. **厂商声称 ≠ 事实。** 涉及效果好坏的表述用「官方称」开头。
5. **正文信息不足就返回空数组。** 宁可留白，不许为了凑数把套话写进去。
6. 中文，每条 20—45 字，不要以句号结尾。`;

const models = readJson(paths.models, []);

let targets = models.filter((m) => REFRESH || !(m.changes?.length > 0));
if (ONLY) targets = targets.filter((m) => ONLY.includes(m.id));
if (ORG) targets = targets.filter((m) => m.org === ORG);
targets = targets.slice(0, LIMIT);

log.step(`提取更新详情：${targets.length} 条待处理（共 ${models.length} 条）`);

if (!targets.length) {
  log.ok('没有需要处理的条目');
  process.exit(0);
}

let provider = null;
if (!DRY) {
  try {
    provider = resolveProvider();
    log.dim(`  provider：${describeProvider(provider)}`);
  } catch (err) {
    log.err(err.message);
    process.exit(1);
  }
}

let done = 0;
let empty = 0;
let failed = 0;
let cursor = 0;

async function worker() {
  while (cursor < targets.length) {
    const m = targets[cursor++];
    const src = sourceUrl(m);
    const isMd = src.endsWith('README.md');

    let text;
    try {
      text = toPlainText(await getText(src), isMd);
    } catch (err) {
      log.warn(`${m.id}：抓正文失败 ${err.message}`);
      failed++;
      continue;
    }

    if (text.length < 200) {
      log.warn(`${m.id}：正文只有 ${text.length} 字，多半是 JS 渲染的页面，跳过`);
      failed++;
      continue;
    }

    if (DRY) {
      console.log(`\n--- ${m.id} (${text.length} 字) ---\n${text.slice(0, 700)}…`);
      done++;
      continue;
    }

    const prompt = `模型：${m.name}（${m.org}，${m.date}）
来源：${src}

<公告正文>
${text}
</公告正文>

提取这次发布的具体更新点，3—6 条。只输出一个 JSON 数组，不要有任何其他文字：
["更新点一", "更新点二"]

正文里没有具体内容就输出 []。`;

    try {
      const res = await complete(provider, {
        system: SYSTEM,
        prompt,
        maxTokens: Number(args['max-tokens'] ?? 8000),
        effort: 'low',
      });

      const raw = res.text.match(/\[[\s\S]*\]/)?.[0];
      if (!raw) {
        log.warn(`${m.id}：模型没返回 JSON 数组`);
        failed++;
        continue;
      }

      const list = JSON.parse(raw).filter((x) => typeof x === 'string' && x.trim().length > 4);
      if (!list.length) {
        log.dim(`  ${m.id.padEnd(32)} 正文没有具体更新点，留空`);
        empty++;
        continue;
      }

      m.changes = list;
      done++;
      log.ok(`${m.id.padEnd(32)} ${list.length} 条`);
      for (const c of list) log.dim(`      · ${c}`);
    } catch (err) {
      log.warn(`${m.id}：${err.message}`);
      failed++;
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

console.log();
log.ok(`提取 ${done} 条${empty ? `，${empty} 条正文无具体内容` : ''}${failed ? `，${failed} 条失败` : ''}`);

if (DRY) {
  log.dim('  --dry-run，没有调用 API，也没有写入');
} else if (done) {
  writeJson(paths.models, models);
  log.dim('  已写回 data/models.json');
  log.warn('这些是机器提取的，发布前请抽查几条是否和公告原文对得上');
}
