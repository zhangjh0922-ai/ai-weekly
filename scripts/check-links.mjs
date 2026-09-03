#!/usr/bin/env node
/**
 * 检查所有外链是否还活着 —— 模型时间线的 url 字段，以及每期正文里的 Markdown 链接。
 *
 *   node scripts/check-links.mjs
 *   node scripts/check-links.mjs --only=models
 *   node scripts/check-links.mjs --concurrency=4
 *
 * 这份周报的可信度几乎全部押在「每条都有原始来源」上，死链等于自毁招牌。
 * 建议每月跑一次，失效的链接要么换地址，要么在正文里标注「原链接已失效」。
 */
import fs from 'node:fs';
import path from 'node:path';
import { paths, readJson, parseArgs, log } from './lib/util.mjs';

const args = parseArgs();
const ONLY = args.only ? String(args.only) : null;
const CONCURRENCY = Number(args.concurrency ?? 6);
const TIMEOUT = Number(args.timeout ?? 20000);

/**
 * 完整的浏览器请求头。只发 User-Agent 是不够的 —— openai.com 这类站点
 * 会因为缺 Sec-Fetch-* / Accept-Language 直接返回 403，制造一堆假死链。
 */
const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};

/** 收集待检查的链接 */
const targets = [];

if (ONLY !== 'issues') {
  for (const m of readJson(paths.models, [])) {
    targets.push({ url: m.url, where: `models.json · ${m.id}` });
  }
}

if (ONLY !== 'models' && fs.existsSync(paths.issues)) {
  for (const file of fs.readdirSync(paths.issues).filter((f) => f.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(paths.issues, file), 'utf8');
    for (const m of text.matchAll(/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
      targets.push({ url: m[1], where: `${file}` });
    }
  }
}

// 同一个 URL 只查一次
const byUrl = new Map();
for (const t of targets) {
  if (!byUrl.has(t.url)) byUrl.set(t.url, []);
  byUrl.get(t.url).push(t.where);
}
const urls = [...byUrl.keys()];

log.step(`检查 ${urls.length} 个链接（去重前 ${targets.length} 个，并发 ${CONCURRENCY}）`);

/**
 * 先 HEAD，很多站点不支持 HEAD 就退回 GET。
 * 403 单独标出来 —— 通常是反爬而不是链接失效，人眼确认一下即可。
 */
async function attempt(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        headers: BROWSER_HEADERS,
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT),
      });
      if (res.ok) return { ok: true, status: res.status };
      if (method === 'GET') return { ok: false, status: res.status };
      if (res.status !== 405 && res.status !== 403) return { ok: false, status: res.status };
    } catch (err) {
      if (method === 'GET') return { ok: false, status: 0, error: err.message };
    }
  }
  return { ok: false, status: 0, error: '未知' };
}

/**
 * 网络层失败（TLS 抖动、连接重置）和 429 限流都要退避重试再判死 ——
 * 一个会误报的检查器比没有检查器更糟，用几次就没人信了。
 * 404 / 403 这种明确的状态码不重试，那是确定的答案。
 */
const RETRYABLE = (r) => r.status === 0 || r.status === 429 || r.status >= 500;

async function check(url, retries = 3) {
  let last;
  for (let i = 0; i < retries; i++) {
    if (i) await new Promise((r) => setTimeout(r, 2500 * i));
    last = await attempt(url);
    if (last.ok || !RETRYABLE(last)) return last;
  }
  return last;
}

const results = [];
let cursor = 0;

await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      const r = await check(url);
      results.push({ url, ...r, where: byUrl.get(url) });
      process.stdout.write(r.ok ? '.' : 'X');
    }
  }),
);

console.log('\n');

const broken = results.filter((r) => !r.ok);
const forbidden = broken.filter((r) => r.status === 403);
const dead = broken.filter((r) => r.status !== 403);

for (const r of dead) {
  log.err(`${String(r.status || 'ERR').padEnd(4)} ${r.url}`);
  log.dim(`     出现在：${r.where.join('、')}`);
  if (r.error) log.dim(`     ${r.error}`);
}

for (const r of forbidden) {
  log.warn(`403  ${r.url}`);
  log.dim(`     出现在：${r.where.join('、')}（多半是反爬，手动打开确认一下）`);
}

console.log();
if (dead.length === 0) {
  log.ok(`${results.length - broken.length}/${results.length} 个链接正常${forbidden.length ? `，${forbidden.length} 个 403 待人工确认` : ''}`);
} else {
  log.err(`${dead.length} 个链接失效，${forbidden.length} 个 403 待确认`);
}

process.exit(dead.length > 0 ? 1 : 0);
