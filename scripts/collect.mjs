#!/usr/bin/env node
/**
 * 从 scripts/sources.json 里的各家官方博客 / 论文源 / 社区源抓取最近的条目，
 * 去重、打标、按时间窗口过滤，写到 .cache/collected.json。
 *
 *   node scripts/collect.mjs                # 至少最近 7 天，停更后从最近已发布稿补采
 *   node scripts/collect.mjs --days=14      # 抓最近 14 天
 *   node scripts/collect.mjs --since=2026-09-08 # 包含指定 UTC 日期起的条目
 *   node scripts/collect.mjs --check        # 只体检各个源是否还活着，不写文件
 *   node scripts/collect.mjs --only=openai,anthropic
 *
 * 这一步不调用任何大模型，纯抓取。判断留给 draft.mjs 和人。
 */
import Parser from 'rss-parser';
import {
  paths, readJson, writeJson, stripHtml, parseArgs, extractPublishDate, log,
} from './lib/util.mjs';
import { collectionWindow, publishedIssueDates } from './lib/collection-window.mjs';

const args = parseArgs();
const CHECK_ONLY = Boolean(args.check);
const ONLY = args.only ? String(args.only).split(',').map((s) => s.trim()) : null;
const TIMEOUT_MS = Number(args.timeout ?? 20000);

// 有些站点对默认 UA 直接 403
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const parser = new Parser();

async function fetchRSS(source) {
  // 自己管理请求：rss-parser 的失败分支不会关闭连接，可能让采集进程无法退出。
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': UA,
      Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(`Status code ${res.status}`);
  }
  // 同一个超时信号也覆盖响应体读取，避免只收到响应头后一直等待。
  return (await parser.parseString(await res.text())).items ?? [];
}

const config = readJson(paths.sources);
if (!config) {
  log.err('找不到 scripts/sources.json');
  process.exit(1);
}

const sources = config.sources.filter((s) => !ONLY || ONLY.includes(s.id));
const kwRelease = config.keywords.release.map((k) => k.toLowerCase());
const kwModel = config.keywords.model.map((k) => k.toLowerCase());

let window;
try {
  window = collectionWindow(args, { publishedDates: publishedIssueDates(paths.issues) });
} catch (error) {
  log.err(error.message);
  process.exit(1);
}
const { cutoff } = window;

/**
 * Hugging Face 热门模型榜。它不是 RSS，但它是捕捉开源权重发布最快的一条线 ——
 * DeepSeek / Qwen / Kimi / GLM 这些经常是先传模型、几小时后才有博客。
 * 这里把 API 返回的模型对象整形成和 RSS item 一样的形状，下游就不用分叉。
 */
async function fetchHuggingFace(source) {
  const res = await fetch(source.url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Status code ${res.status}`);

  const models = await res.json();
  return models.map((m) => {
    const task = m.pipeline_tag ? `${m.pipeline_tag} · ` : '';
    return {
      title: `${m.id}（HF 热门模型）`,
      link: `https://huggingface.co/${m.id}`,
      isoDate: m.createdAt ?? m.lastModified ?? null,
      contentSnippet:
        `${task}${(m.likes ?? 0).toLocaleString()} likes · ` +
        `${(m.downloads ?? 0).toLocaleString()} downloads` +
        (m.tags?.length ? ` · ${m.tags.slice(0, 8).join(', ')}` : ''),
    };
  });
}

/**
 * 走 sitemap 的厂商 —— Anthropic 没有 RSS，但 robots.txt 是 Allow: /。
 *
 * 两个坑，都真的踩过：
 *  1. **发布页不一定在 /news/ 下。** Claude Fable 5.1 的公告在根路径
 *     `/claude-fable-and-mythos-5-1`，早期规则写死 /news/ 前缀，整条漏掉。
 *  2. **sitemap 的 lastmod 不是发布日**，是最后修改时间。这里只拿它做初筛，
 *     真实日期回页面里取；页面确实没写日期时才退回 lastmod，并在标题上标注出来。
 */
async function fetchSitemap(source) {
  const pageHeaders = {
    'User-Agent': UA,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
  };

  const res = await fetch(source.url, {
    headers: pageHeaders,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Status code ${res.status}`);
  const xml = await res.text();


  // sitemap 往往有几百个 URL，其中绝大多数是招聘、活动、条款页。
  // 不先按路径筛，maxItems 会被这些噪音占满 —— 实测漏掉了 Fable 5.1 的发布页。
  const include = source.include ? new RegExp(source.include, 'i') : null;
  const exclude = source.exclude ? new RegExp(source.exclude, 'i') : null;

  const rows = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
    .map((m) => ({ url: m[1], lastmod: m[2].slice(0, 10) }))
    .filter((r) => !include || include.test(r.url))
    .filter((r) => !exclude || !exclude.test(r.url))
    // lastmod 放宽一周做初筛，避免因为「改过但没重发」而误杀
    .filter((r) => new Date(r.lastmod).getTime() >= cutoff - 7 * 86_400_000)
    .sort((a, b) => b.lastmod.localeCompare(a.lastmod))
    .slice(0, source.maxItems ?? 25);

  const items = [];
  for (const row of rows) {
    try {
      const r = await fetch(row.url, {
        headers: pageHeaders,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!r.ok) continue;
      const html = await r.text();

      const title = (
        html.match(/property="og:title"\s+content="([^"]*)"/)?.[1] ??
        html.match(/<h1[^>]*>([^<]{2,140})</)?.[1] ??
        html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ??
        ''
      )
        .replace(/\s*[\\|｜]\s*Anthropic\s*$/, '')
        .trim();
      if (!title) continue;

      const found = extractPublishDate(html, row.lastmod);
      if (!found) continue;

      const desc = html.match(/property="og:description"\s+content="([^"]*)"/)?.[1] ?? '';

      const mark =
        found.precision === 'day'
          ? ''
          : found.precision === 'month'
            ? '（页面只标到月，日期为近似）'
            : '（页面未标日期，取自 sitemap lastmod）';

      items.push({
        title: title + mark,
        link: row.url,
        isoDate: `${found.date}T00:00:00.000Z`,
        contentSnippet: desc,
      });
    } catch {
      // 单页失败不影响整个源
    }
  }
  return items;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 抓一个源，永远不抛异常 —— 单个源挂掉不该让整周的采集失败。
 * 429 和 TLS 抖动都很常见，退避重试两次再放弃。
 */
async function fetchSource(source, retries = 2) {
  const started = Date.now();
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(1500 * 2 ** (attempt - 1));
    try {
      const items =
        source.type === 'hf-trending'
          ? await fetchHuggingFace(source)
          : source.type === 'sitemap'
            ? await fetchSitemap(source)
            : await fetchRSS(source);
      return { source, ok: true, ms: Date.now() - started, items, attempts: attempt + 1 };
    } catch (err) {
      lastError = err;
    }
  }

  return {
    source,
    ok: false,
    ms: Date.now() - started,
    items: [],
    error: lastError.message,
    attempts: retries + 1,
  };
}

function classify(title, summary) {
  const hay = `${title} ${summary}`.toLowerCase();
  const looksRelease = kwRelease.some((k) => hay.includes(k));
  const mentionsModel = kwModel.some((k) => hay.includes(k));
  return {
    likelyRelease: looksRelease && mentionsModel,
    mentionsModel,
  };
}

/** 归一化 URL 用于去重：去掉 utm 之类的查询参数和末尾斜杠 */
function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = '';
    for (const k of [...url.searchParams.keys()]) {
      if (/^(utm_|ref|source|fbclid|gclid)/i.test(k)) url.searchParams.delete(k);
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return u;
  }
}

// map 会传入下标作为第二个参数，不能让它覆盖 fetchSource 的重试次数。
const results = await Promise.all(sources.map((source) => fetchSource(source)));

// ---- 体检模式 ----
if (CHECK_ONLY) {
  log.step(`体检 ${results.length} 个源`);
  let dead = 0;
  for (const r of results.sort((a, b) => Number(a.ok) - Number(b.ok))) {
    if (r.ok) {
      log.ok(`${r.source.id.padEnd(14)} ${String(r.items.length).padStart(3)} 条  ${r.ms}ms`);
    } else {
      dead++;
      log.err(`${r.source.id.padEnd(14)} ${r.source.url}\n   ${r.error}`);
    }
  }
  console.log();
  if (dead) {
    log.warn(`${dead}/${results.length} 个源失败 —— 从 scripts/sources.json 里删掉或换地址`);
  } else {
    log.ok('全部源正常');
  }
  process.exit(dead > 0 ? 1 : 0);
}

// ---- 正常采集 ----
log.step(`采集 ${window.rangeLabel}`);

const seen = new Map();
const failures = [];

for (const r of results) {
  if (!r.ok) {
    failures.push({ id: r.source.id, url: r.source.url, error: r.error });
    log.warn(`${r.source.id} 抓取失败：${r.error}`);
    continue;
  }

  let kept = 0;
  const cap = r.source.maxItems ?? Infinity;

  for (const item of r.items) {
    if (kept >= cap) break;

    const link = item.link || item.guid;
    if (!link) continue;

    const publishedRaw = item.isoDate || item.pubDate;
    const published = publishedRaw ? new Date(publishedRaw) : null;
    // 少数源不给日期（例如某些 arXiv 镜像），宁可留下让人判断，也不要静默丢掉
    if (published && !Number.isNaN(published.getTime()) && published.getTime() < cutoff) continue;

    const key = normalizeUrl(link);
    const title = (item.title ?? '').trim();
    const summary = stripHtml(item.contentSnippet || item.content || item.summary || '');

    if (seen.has(key)) {
      // 同一条被多个源覆盖 —— 是热度信号，记下来
      seen.get(key).alsoSeenIn.push(r.source.id);
      continue;
    }

    seen.set(key, {
      title,
      url: key,
      source: r.source.id,
      sourceName: r.source.name,
      category: r.source.category,
      weight: r.source.weight ?? 1,
      published: published && !Number.isNaN(published.getTime()) ? published.toISOString() : null,
      summary,
      author: item.creator || item.author || null,
      alsoSeenIn: [],
      ...classify(title, summary),
    });
    kept++;
  }

  log.dim(`  ${r.source.id.padEnd(14)} ${String(kept).padStart(3)} 条`);
}

const items = [...seen.values()].sort((a, b) => {
  // 疑似发布 > 被多个源转载 > 源权重 > 时间
  if (a.likelyRelease !== b.likelyRelease) return a.likelyRelease ? -1 : 1;
  if (a.alsoSeenIn.length !== b.alsoSeenIn.length) return b.alsoSeenIn.length - a.alsoSeenIn.length;
  if (a.weight !== b.weight) return b.weight - a.weight;
  return (b.published ?? '').localeCompare(a.published ?? '');
});

const payload = {
  collectedAt: new Date().toISOString(),
  windowDays: window.windowDays,
  windowStart: window.windowStart,
  windowEnd: window.windowEnd,
  windowMode: window.windowMode,
  rangeLabel: window.rangeLabel,
  sourceCount: sources.length,
  failures,
  stats: {
    total: items.length,
    likelyRelease: items.filter((i) => i.likelyRelease).length,
    byCategory: Object.fromEntries(
      Object.entries(
        items.reduce((acc, i) => {
          acc[i.category] = (acc[i.category] ?? 0) + 1;
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1]),
    ),
  },
  items,
};

writeJson(paths.raw, payload);

console.log();
log.ok(`${items.length} 条候选（其中 ${payload.stats.likelyRelease} 条疑似模型/产品发布）`);
log.dim(`  时间窗口 ${payload.rangeLabel}`);
log.dim(`  写入 .cache/collected.json`);
if (failures.length) log.warn(`${failures.length} 个源失败，跑 --check 看详情`);
console.log(`\n下一步：npm run draft`);
