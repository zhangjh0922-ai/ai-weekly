import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const paths = {
  sources: path.join(ROOT, 'scripts', 'sources.json'),
  raw: path.join(ROOT, '.cache', 'collected.json'),
  issues: path.join(ROOT, 'src', 'content', 'issues'),
  models: path.join(ROOT, 'data', 'models.json'),
  proposedModels: path.join(ROOT, '.cache', 'proposed-models.json'),
  harvestedModels: path.join(ROOT, '.cache', 'harvested-models.json'),
};

/** 极简 .env 读取，避免为一个功能再拉一个依赖 */
export function loadEnv(file = path.join(ROOT, '.env')) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

export function readJson(file, fallback = null) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

export function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, 'utf8');
}

/** 把 HTML 摘要压成纯文本，顺便截断 */
export function stripHtml(html = '', limit = 600) {
  const text = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > limit ? text.slice(0, limit) + '…' : text;
}

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/**
 * 从 HTML 里抠发布日期。
 *
 * 为什么不能「取第一个像日期的字符串」：Anthropic 的 Fable 5.1 发布页正文里
 * 有一句无关的 "August 2, 2026"，而页面真正的日期行是顶部的 "September 2026"。
 * 直接取第一个匹配会把这条标成 8 月 2 日，然后被采集窗口过滤掉 —— 整条漏掉。
 *
 * 靠**位置**区分：真正的日期行都在文档很靠前的地方（实测 anthropic.com 的
 * 新闻页在 4—7% 处），正文里的日期在 50% 以后。
 *
 * @param {string} html
 * @param {string|null} lastmod  sitemap 的 lastmod，只作兜底，不当发布日
 * @returns {{date: string, precision: 'day'|'month'|'lastmod'}|null}
 */
export function extractPublishDate(html, lastmod = null) {
  // 只在文档前 10%（且至少前 30KB）里找日期行
  const head = html.slice(0, Math.max(30_000, Math.floor(html.length * 0.1)));

  const day = head.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2}),\s+(20\d\d)\b/,
  );
  if (day) {
    const mm = MONTHS[day[1].toLowerCase()];
    return { date: `${day[3]}-${mm}-${String(day[2]).padStart(2, '0')}`, precision: 'day' };
  }

  // 退一步：只精确到月的（"SEPTEMBER 2026"）。
  // lastmod 落在这个月里就用 lastmod，否则用月初，并标明精度。
  const month = head.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d\d)\b/i,
  );
  if (month) {
    const mm = MONTHS[month[1].slice(0, 3).toLowerCase()];
    const prefix = `${month[2]}-${mm}`;
    if (lastmod && lastmod.startsWith(prefix)) return { date: lastmod, precision: 'month' };
    return { date: `${prefix}-01`, precision: 'month' };
  }

  if (lastmod) return { date: lastmod, precision: 'lastmod' };
  return null;
}

/** ISO 周 slug，例如 2026-w36 —— 和站点里的 isoWeekSlug 保持一致 */
export function isoWeekSlug(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${date.getUTCFullYear()}-w${String(week).padStart(2, '0')}`;
}

export function isoDay(d = new Date()) {
  return new Date(d).toISOString().slice(0, 10);
}

/** 解析 --key=value / --flag 形式的参数 */
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [k, ...rest] = arg.slice(2).split('=');
      out[k] = rest.length ? rest.join('=') : true;
    } else {
      out._.push(arg);
    }
  }
  return out;
}

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const paint = (c, s) => (process.stdout.isTTY ? `${COLORS[c]}${s}${COLORS.reset}` : s);

export const log = {
  info: (...a) => console.log(...a),
  dim: (...a) => console.log(paint('dim', a.join(' '))),
  ok: (...a) => console.log(paint('green', '✓'), ...a),
  warn: (...a) => console.log(paint('yellow', '!'), ...a),
  err: (...a) => console.error(paint('red', '✗'), ...a),
  step: (...a) => console.log('\n' + paint('cyan', '▸'), ...a),
};
