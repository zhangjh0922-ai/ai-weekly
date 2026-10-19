import fs from 'node:fs';
import path from 'node:path';

const DAY_MS = 86_400_000;

function dateTimestamp(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp : null;
}

/** 只读取 frontmatter。未声明 draft 时沿用内容 schema 的 false 默认值。 */
export function publishedIssueDates(directory) {
  if (!directory || !fs.existsSync(directory)) return [];
  const dates = [];
  for (const file of fs.readdirSync(directory).filter(name => name.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(directory, file), 'utf8');
    const frontmatter = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
    if (!frontmatter) continue;
    const draft = frontmatter.match(/^draft:[ \t]*([^\r\n]*)/m)?.[1].split('#')[0].trim().toLowerCase();
    if (draft !== undefined && draft !== 'false') continue;
    const dateLine = frontmatter.match(/^date:[ \t]*([^\r\n]*)/m)?.[1].split('#')[0].trim();
    const date = dateLine?.replace(/^(["'])(.*)\1$/, '$2');
    if (dateTimestamp(date) !== null) dates.push(date);
  }
  return dates;
}

/** 显式参数优先；自动模式从最近已发布稿恢复，至少覆盖最近七天。 */
export function collectionWindow(args = {}, { now = new Date(), publishedDates = [] } = {}) {
  const end = new Date(now).getTime();
  if (!Number.isFinite(end)) throw new Error('采集结束时间无效');
  const explicitDays = args.days !== undefined && args.days !== 'auto';
  if (explicitDays && args.since !== undefined) throw new Error('--days 和 --since 不能同时指定');
  let cutoff;
  let windowMode;
  if (args.since !== undefined) {
    cutoff = dateTimestamp(args.since);
    if (cutoff === null || cutoff > end) throw new Error('--since 必须是有效且不晚于今天的 YYYY-MM-DD 日期');
    windowMode = 'since';
  } else if (explicitDays) {
    const days = Number(args.days);
    if (typeof args.days === 'boolean' || !Number.isSafeInteger(days) || days <= 0) {
      throw new Error('--days 必须是正整数或 auto');
    }
    cutoff = end - days * DAY_MS;
    if (!Number.isFinite(new Date(cutoff).getTime())) throw new Error('--days 超出有效日期范围');
    windowMode = 'days';
  } else {
    const published = publishedDates.map(dateTimestamp).filter(date => date !== null && date <= end);
    const latest = published.length ? Math.max(...published) : end;
    cutoff = Math.min(end - 7 * DAY_MS, latest);
    windowMode = 'auto';
  }
  const windowStart = new Date(cutoff).toISOString();
  const windowEnd = new Date(end).toISOString();
  return {
    cutoff,
    windowStart,
    windowEnd,
    windowDays: Math.ceil((end - cutoff) / DAY_MS),
    windowMode,
    rangeLabel: `${windowStart.slice(0, 10)} ~ ${windowEnd.slice(0, 10)}`,
  };
}
