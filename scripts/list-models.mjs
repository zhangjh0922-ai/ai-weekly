#!/usr/bin/env node
/**
 * 问当前 provider 的端点要一份真实可用的模型列表。
 *
 *   node scripts/list-models.mjs
 *   node scripts/list-models.mjs --provider=moonshot
 *   node scripts/list-models.mjs --filter=kimi
 *
 * 为什么需要这个：API 上的模型 ID 和 Hugging Face 上的仓库名经常对不上
 * （HF 是 moonshotai/Kimi-K3，API 里未必就叫 kimi-k3），猜一个填进 LLM_MODEL
 * 换来的通常是一个 404 或者空响应。直接问端点最省事。
 */
import { loadEnv, parseArgs, log } from './lib/util.mjs';
import { resolveProvider, PRESETS } from './lib/llm.mjs';

loadEnv();

const args = parseArgs();
if (args.provider) process.env.LLM_PROVIDER = String(args.provider);
// 列模型不需要指定具体模型，塞个占位值绕过 resolveProvider 的必填校验
if (!process.env.LLM_MODEL) process.env.LLM_MODEL = '__list__';

const FILTER = args.filter ? String(args.filter).toLowerCase() : null;

let provider;
try {
  provider = resolveProvider();
} catch (err) {
  log.err(err.message);
  process.exit(1);
}

if (provider.kind === 'anthropic') {
  log.step('Anthropic 模型列表');
  const res = await fetch('https://api.anthropic.com/v1/models?limit=100', {
    headers: { 'x-api-key': provider.apiKey, 'anthropic-version': '2023-06-01' },
  });
  if (!res.ok) {
    log.err(`HTTP ${res.status}：${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  const { data } = await res.json();
  show(data.map((m) => ({ id: m.id, extra: m.display_name })));
} else if (provider.kind === 'gemini') {
  log.step('Gemini 模型列表');
  const res = await fetch(
    `${provider.baseURL}/models?key=${encodeURIComponent(provider.apiKey)}&pageSize=200`,
  );
  if (!res.ok) {
    log.err(`HTTP ${res.status}：${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  const { models } = await res.json();
  show(
    models
      .filter((m) => (m.supportedGenerationMethods ?? []).includes('generateContent'))
      .map((m) => ({ id: m.name.replace(/^models\//, ''), extra: m.displayName })),
  );
} else {
  log.step(`${provider.label} 模型列表`);
  log.dim(`  ${provider.baseURL}/models`);
  const res = await fetch(`${provider.baseURL.replace(/\/$/, '')}/models`, {
    headers: provider.apiKey ? { Authorization: `Bearer ${provider.apiKey}` } : {},
  });
  if (!res.ok) {
    log.err(`HTTP ${res.status}：${(await res.text()).slice(0, 300)}`);
    if (res.status === 401) log.dim('  key 不对，或者填到了错误的环境变量里');
    process.exit(1);
  }
  const body = await res.json();
  const list = body.data ?? body.models ?? [];
  show(list.map((m) => ({ id: m.id ?? m.name, extra: m.owned_by })));
}

function show(items) {
  const filtered = FILTER ? items.filter((m) => m.id.toLowerCase().includes(FILTER)) : items;
  const sorted = filtered.sort((a, b) => a.id.localeCompare(b.id));

  console.log();
  if (!sorted.length) {
    log.warn(FILTER ? `没有匹配 "${FILTER}" 的模型（共 ${items.length} 个）` : '端点没有返回任何模型');
    if (FILTER) log.dim('  去掉 --filter 看全部');
    process.exit(0);
  }

  for (const m of sorted) {
    console.log(`  ${m.id}${m.extra ? `  ${m.extra}` : ''}`);
  }
  console.log();
  log.ok(`${sorted.length} 个模型${FILTER ? `（已按 "${FILTER}" 过滤，共 ${items.length} 个）` : ''}`);
  console.log(`\n把要用的那个填进 .env：\n  LLM_MODEL=${sorted[0].id}`);
}
