/** 拼上 BASE_URL，避免部署到 /<仓库名>/ 子路径时链接全挂 */
export function link(href: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const out = `${base}${href.startsWith('/') ? href : `/${href}`}`.replace(/\/{2,}/g, '/');
  return out || '/';
}

export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

/** 距今天数，用于把最近的模型标成高亮点 */
export function daysAgo(d: Date | string, now = new Date()): number {
  const date = typeof d === 'string' ? new Date(d) : d;
  return Math.floor((now.getTime() - date.getTime()) / 86_400_000);
}

/**
 * 用 ISO 周算出期号文件名建议，例如 2026-w36。
 * 周一为一周之首，和 ISO-8601 一致。
 */
export function isoWeekSlug(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${date.getUTCFullYear()}-w${String(week).padStart(2, '0')}`;
}

/* ------------------------------------------------------------------
   模型规格的格式化。全部只做单位换算，不做任何推断 ——
   拿不到的字段一律返回 null，由调用方决定是否整行不显示。
   ------------------------------------------------------------------ */

/** 参数量：321323031390 → "321.3B"；超过一万亿用 T */
export function formatParams(n?: number | null): string | null {
  if (!n) return null;
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return String(n);
}

/** 权重体积：657000000000 → "657 GB" */
export function formatBytes(n?: number | null): string | null {
  if (!n) return null;
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)} TB`;
  return `${(n / 1e9).toFixed(0)} GB`;
}

/** 上下文：1048576 → "1M"，262144 → "256K" */
export function formatContext(n?: number | null): string | null {
  if (!n) return null;
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(n % (1024 * 1024) ? 1 : 0)}M`;
  if (n >= 1024) return `${Math.round(n / 1024)}K`;
  return String(n);
}

export function formatCount(n?: number | null): string | null {
  if (n == null) return null;
  return n.toLocaleString('en-US');
}

/**
 * 和上一代比。只对双方都有的数字字段算，缺一边就不出这一行 ——
 * 宁可少给一行，也不要拿「?」去凑一个看起来完整的对比表。
 */
export interface SpecDiff {
  label: string;
  from: string;
  to: string;
  /** 变大 / 变小 / 持平，用来决定箭头方向和配色 */
  direction: 'up' | 'down' | 'same';
  /** 例如「4.4 倍」，只在倍数明显时给 */
  ratio?: string;
}

type SpecsLike = Record<string, unknown> | undefined | null;

export function diffSpecs(cur: SpecsLike, prev: SpecsLike): SpecDiff[] {
  if (!cur || !prev) return [];

  const fields: Array<[string, string, (n: number) => string | null]> = [
    ['params', '参数量', formatParams],
    ['contextTokens', '上下文', formatContext],
    ['weightsBytes', '权重体积', formatBytes],
    ['experts', 'MoE 专家数', (n) => String(n)],
    ['expertsPerToken', '每 token 激活专家', (n) => String(n)],
  ];

  const out: SpecDiff[] = [];

  for (const [key, label, fmt] of fields) {
    const a = prev[key as keyof typeof prev];
    const b = cur[key as keyof typeof cur];
    if (typeof a !== 'number' || typeof b !== 'number' || !a || !b) continue;
    if (a === b) continue;

    const times = b / a;
    out.push({
      label,
      from: fmt(a) ?? String(a),
      to: fmt(b) ?? String(b),
      direction: b > a ? 'up' : 'down',
      ratio:
        times >= 1.5 ? `${times.toFixed(1)} 倍` : times <= 0.67 ? `${(1 / times).toFixed(1)} 分之一` : undefined,
    });
  }

  // 精度变化必须一起显示，否则「权重体积减半」会被读成「模型变小了」。
  // 真实案例：GLM-5.2 → 5.3 参数量没变，但精度从 BF16 换成 FP8，体积自然砍半。
  if (typeof prev.precision === 'string' && typeof cur.precision === 'string') {
    if (prev.precision !== cur.precision) {
      out.push({
        label: '权重精度',
        from: prev.precision,
        to: cur.precision,
        direction: 'same',
      });
    }
  }

  return out;
}
