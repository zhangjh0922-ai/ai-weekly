#!/usr/bin/env node
/**
 * 抓模型发布，产出 data/models.json 的候选条目。**不调用大模型**，全部是可核实的结构化数据。
 *
 * 两条线：
 *   开放权重 —— Hugging Face API（作者、创建时间、下载量、许可、模态都来自官方元数据）
 *   闭源模型 —— 各家官方博客 RSS，用严格的标题规则筛出发布公告
 *
 *   node scripts/harvest-models.mjs                  # 最近 90 天，likes >= 200
 *   node scripts/harvest-models.mjs --days=365 --min-likes=500
 *   node scripts/harvest-models.mjs --merge          # 直接并进 data/models.json（会跳过已有 id）
 *
 * 默认只写 .cache/harvested-models.json 供人工核对。日期和链接是这份时间线的全部价值，
 * 不核对就合并等于自毁招牌。
 */
import Parser from 'rss-parser';
import { extractReleaseModelNames, selectNewModels } from './lib/model-release-names.mjs';
import { paths, readJson, writeJson, parseArgs, log } from './lib/util.mjs';

const args = parseArgs();
const DAYS = Number(args.days ?? 90);
const MIN_LIKES = Number(args['min-likes'] ?? 200);
const MERGE = Boolean(args.merge);

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/** Hugging Face 上的组织 → 周报里显示的发布方名字 */
const ORGS = {
  'deepseek-ai': 'DeepSeek',
  Qwen: '阿里通义',
  'zai-org': 'Z.ai（智谱）',
  tencent: '腾讯',
  moonshotai: 'Moonshot AI（月之暗面）',
  MiniMaxAI: 'MiniMax',
  'meta-llama': 'Meta',
  mistralai: 'Mistral AI',
  google: 'Google',
  microsoft: 'Microsoft',
  nvidia: 'NVIDIA',
  'ibm-granite': 'IBM',
  allenai: 'Allen AI',
  openbmb: 'OpenBMB（面壁智能）',
  internlm: '上海人工智能实验室',
  baidu: '百度',
  'ByteDance-Seed': '字节跳动 Seed',
  'stepfun-ai': '阶跃星辰',
  XiaomiMiMo: '小米',
  OpenGVLab: '上海人工智能实验室',
  LiquidAI: 'Liquid AI',
  HuggingFaceTB: 'Hugging Face',
};

/**
 * 量化版、格式转换版、蒸馏小版本不算「一次发布」，它们是同一个模型的再打包。
 * 放进时间线只会把真正的发布淹掉。
 */
const VARIANT = new RegExp(
  '(' +
    [
      'GGUF', 'AWQ', 'GPTQ', 'MLX', 'ONNX', 'TensorRT', 'OpenVINO',
      'FP8', 'FP4', 'BF16', 'FP16', 'INT4', 'INT8', 'W8A8', 'W4A16',
      '4bit', '8bit', 'bnb', 'NVFP4', 'quantized', 'Draft', 'EAGLE',
    ].join('|') +
    ')',
  'i',
);

const cutoff = Date.now() - DAYS * 86_400_000;

async function getJson(url, retries = 4) {
  let last;
  for (let i = 0; i < retries; i++) {
    if (i) await new Promise((r) => setTimeout(r, 1200 * i));
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
        signal: AbortSignal.timeout(25000),
      });
      if (res.ok) return res.json();
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

/** 从 tags 里挑出对读者有意义的信息：许可、语言、模态 */
function readTags(m) {
  const tags = m.tags ?? [];
  const license = tags.find((t) => t.startsWith('license:'))?.slice(8) ?? null;
  const langs = tags.filter((t) => /^(zh|en|ja|ko|fr|de|es|ru|ar)$/.test(t));
  const arxiv = tags.find((t) => t.startsWith('arxiv:'))?.slice(6) ?? null;

  const out = ['开源权重'];
  const pt = m.pipeline_tag ?? '';
  if (/image-text|any-to-any|visual/.test(pt)) out.push('多模态');
  if (/text-to-image/.test(pt)) out.push('图像生成');
  if (/text-to-video|image-to-video/.test(pt)) out.push('视频生成');
  if (/text-to-speech|automatic-speech/.test(pt)) out.push('语音');
  if (/feature-extraction|sentence-similarity/.test(pt)) out.push('向量模型');
  if (langs.includes('zh')) out.push('中文');
  if (license && /^(mit|apache)/i.test(license)) out.push(license.toUpperCase().split('-')[0]);

  return { tags: [...new Set(out)], license, arxiv, langs };
}

const fmt = (n) => (n ?? 0).toLocaleString('en-US');

function slugify(id) {
  return id
    .split('/')
    .pop()
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/\./g, '-')
    .replace(/^-|-$/g, '');
}

// ------------------------------------------------------------ 开放权重

log.step(`抓开放权重（最近 ${DAYS} 天，likes ≥ ${MIN_LIKES}，${Object.keys(ORGS).length} 个组织）`);

const open = [];

for (const [org, display] of Object.entries(ORGS)) {
  let models;
  try {
    models = await getJson(
      `https://huggingface.co/api/models?author=${encodeURIComponent(org)}` +
        `&sort=createdAt&direction=-1&limit=100&full=true`,
    );
  } catch (err) {
    log.warn(`${org.padEnd(16)} 抓取失败：${err.message}`);
    continue;
  }

  const kept = [];
  for (const m of models) {
    const created = m.createdAt ? new Date(m.createdAt) : null;
    if (!created || created.getTime() < cutoff) continue;
    if ((m.likes ?? 0) < MIN_LIKES) continue;
    if (VARIANT.test(m.id)) continue;

    const meta = readTags(m);
    const name = m.id.split('/').pop();

    kept.push({
      id: slugify(m.id),
      name,
      org: display,
      date: m.createdAt.slice(0, 10),
      url: `https://huggingface.co/${m.id}`,
      note:
        `${meta.license ? meta.license.toUpperCase() + ' 许可，' : ''}` +
        `${m.pipeline_tag ? m.pipeline_tag + '，' : ''}` +
        `Hugging Face 上 ${fmt(m.likes)} likes / ${fmt(m.downloads)} 次下载` +
        `${meta.arxiv ? `，配套论文 arXiv:${meta.arxiv}` : ''}。` +
        `（数据抓取于 ${new Date().toISOString().slice(0, 10)}，note 需人工改写）`,
      tags: meta.tags,
      _likes: m.likes,
      _downloads: m.downloads,
    });
  }

  open.push(...kept);
  log.dim(`  ${org.padEnd(16)} ${String(kept.length).padStart(2)} 条`);
}

// ------------------------------------------------------------ 闭源公告

log.step('抓闭源模型公告（各家官方博客）');

const parser = new Parser({
  timeout: 20000,
  headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/xml, */*' },
});

const BLOGS = [
  { url: 'https://openai.com/news/rss.xml', org: 'OpenAI' },
  { url: 'https://deepmind.google/blog/rss.xml', org: 'Google DeepMind' },
  { url: 'https://mistral.ai/rss.xml', org: 'Mistral AI' },
  { url: 'https://qwenlm.github.io/blog/index.xml', org: '阿里通义' },
];

const closed = [];

/** 和 collect.mjs 同样的退避重试：TLS 抖动和 429 太常见了 */
async function parseFeed(url, retries = 3) {
  let last;
  for (let i = 0; i < retries; i++) {
    if (i) await new Promise((r) => setTimeout(r, 1500 * i));
    try {
      return await parser.parseURL(url);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

for (const blog of BLOGS) {
  try {
    const feed = await parseFeed(blog.url);
    let kept = 0;

    for (const item of feed.items ?? []) {
      const when = item.isoDate || item.pubDate;
      if (!when) continue;
      const d = new Date(when);
      if (Number.isNaN(d.getTime()) || d.getTime() < cutoff) continue;

      const title = (item.title ?? '').trim();
      for (const model of extractReleaseModelNames(title)) {
        closed.push({
          id: slugify(model + '-' + d.toISOString().slice(0, 10)),
          name: model,
          org: blog.org,
          date: d.toISOString().slice(0, 10),
          url: item.link,
          note: `官方公告：「${title}」。（标题自动提取，模型名和内容需人工核对改写）`,
          tags: ['闭源 API'],
          _title: title,
        });
        kept++;
      }
    }
    log.dim(`  ${blog.org.padEnd(18)} ${String(kept).padStart(2)} 条`);
  } catch (err) {
    log.warn(`${blog.org} 抓取失败：${err.message}`);
  }
}

// ------------------------------------------ 无 RSS 的厂商：走 sitemap

/**
 * 有些厂商没有 RSS，但有 robots.txt 允许抓取的 sitemap.xml。
 * 流程：sitemap 找出像发布公告的 URL → 逐页取标题和页面上标注的日期。
 *
 * ⚠️ 千万别用 sitemap 的 lastmod 当发布日 —— 那是「最后修改时间」。
 * 实测 Anthropic 的 claude-sonnet-4-5 / opus-4-6 / haiku-4-5 / opus-4-8
 * lastmod 全是 2026-07-22，那是一次站点重新渲染。必须回页面里取。
 */
const SITEMAP_VENDORS = [
  {
    id: 'anthropic',
    org: 'Anthropic',
    sitemap: 'https://www.anthropic.com/sitemap.xml',
    // 只取形如 /news/claude-opus-5、/news/claude-sonnet-4-6 的模型页
    // ⚠️ 不要只认 /news/ 前缀。Anthropic 有些发布页放在站点根路径下，
    // 例如 /claude-fable-and-mythos-5-1（Fable 5.1 的发布公告），
    // 之前的规则写死了 /news/，把这条整个漏掉了。
    match:
      /anthropic\.com\/(?:news\/)?((?:claude-)?(?:opus|sonnet|haiku|fable|mythos)[a-z-]*[\d][\w-]*|claude-(?:opus|sonnet|haiku|fable|mythos)[\w-]*)$/i,
    stripTitle: /\s*[\|｜]\s*Anthropic\s*$/,
  },
  {
    id: 'bytedance-seed',
    org: '字节跳动 Seed',
    sitemap: 'https://seed.bytedance.com/sitemap.xml',
    // 博客里带 seedance / seedream / seed N.N / seed3d 的发布贴
    match: /\/blog\/((?:[^<\/]*)?(?:seedance|seedream|seed\d?-?\d|seed3d|seed-audio|seedrealtime)[^<\/]*)$/i,
    stripTitle: /\s*[-—|]\s*(?:字节跳动Seed|ByteDance Seed)\s*$/,
    // 这个站把发布日期明确标成「日期 2026-02-12」
    dateFromIso: true,
    // slug 里含 seed + 数字就会命中 match，校招公告「seed-2027-...」也会混进来
    exclude: /recruit|internship|campus|hiring|招聘|校招|活动/i,
  },
];

const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                 Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };

const PAGE_HEADERS = {
  'User-Agent': UA,
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
      const res = await fetch(url, { headers: PAGE_HEADERS, signal: AbortSignal.timeout(25000) });
      if (res.ok) return res.text();
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

/**
 * 标题。og:title 最准，但不是每家都有 —— seed.bytedance.com 就完全没有这个 meta，
 * 标题只在 <h1> 里；直接退回 <title> 会拿到栏目名「团队动态」，全部条目长一个样。
 * 所以顺序是：og:title → h1 → title。
 */
function readTitle(html, strip) {
  const raw =
    html.match(/property="og:title"\s+content="([^"]*)"/)?.[1] ??
    html.match(/content="([^"]*)"\s+property="og:title"/)?.[1] ??
    html.match(/<h1[^>]*>([^<]{2,140})</)?.[1] ??
    html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ??
    '';
  return raw.replace(strip ?? /$^/, '').trim();
}

/** 日期：先找页面上明确标注的 ISO，再退回英文长日期 */
function readDate(html, preferIso) {
  if (preferIso) {
    const iso = html.match(/(20\d\d-\d{2}-\d{2})/);
    if (iso) return iso[1];
  }
  const d = html.match(
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)\s+(\d{1,2}),\s+(20\d\d)/,
  );
  if (d) return `${d[3]}-${MONTHS[d[1].slice(0, 3)]}-${String(d[2]).padStart(2, '0')}`;
  const iso = html.match(/(20\d\d-\d{2}-\d{2})/);
  return iso ? iso[1] : null;
}

const fromSitemap = [];

if (!args['skip-sitemap']) {
  for (const v of SITEMAP_VENDORS) {
    log.step(`抓 ${v.org} 模型发布（走 sitemap，官方没有 RSS）`);
    try {
      const xml = await getText(v.sitemap);
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => m[1])
        .filter((u) => v.match.test(u) && !(v.exclude && v.exclude.test(u)));

      log.dim(`  sitemap 里命中 ${urls.length} 个页面`);

      let kept = 0;
      for (const url of urls) {
        try {
          const html = await getText(url);
          const title = readTitle(html, v.stripTitle);
          const date = readDate(html, v.dateFromIso);
          if (!date) {
            log.warn(`  ${url.split('/').pop()}：找不到日期，跳过`);
            continue;
          }
          if (new Date(date).getTime() < cutoff) continue;

          fromSitemap.push({
            id: slugify(url.split('/').pop()),
            name: title.replace(/^Introducing\s+/i, '').trim() || url.split('/').pop(),
            org: v.org,
            date,
            url,
            note: `官方公告：「${title}」。（标题与日期自动提取，note 需人工改写）`,
            tags: ['闭源 API'],
            _title: title,
          });
          kept++;
        } catch (err) {
          log.warn(`  ${url.split('/').pop()}：${err.message}`);
        }
      }
      log.dim(`  取到 ${kept} 条（在时间窗口内）`);
    } catch (err) {
      log.warn(`${v.org} sitemap 抓取失败：${err.message}`);
    }
  }
}

// ------------------------------------------------------------ 汇总

const all = [...open, ...closed, ...fromSitemap].sort((a, b) => b.date.localeCompare(a.date));

const existing = readJson(paths.models, []);
const fresh = selectNewModels(all, existing);

console.log();
log.ok(`共 ${all.length} 条（开放权重 ${open.length} / 闭源 RSS ${closed.length} / sitemap ${fromSitemap.length}），其中 ${fresh.length} 条是新的`);

writeJson(paths.harvestedModels, fresh);
log.dim(`  写入 .cache/harvested-models.json`);

if (MERGE) {
  const merged = [...existing, ...fresh.map(({ _likes, _downloads, _title, ...m }) => m)].sort(
    (a, b) => b.date.localeCompare(a.date),
  );
  writeJson(paths.models, merged);
  log.ok(`已并入 data/models.json，现在共 ${merged.length} 条`);
  log.warn('note 字段是机器生成的，务必逐条改写成人话再发布');
} else {
  console.log(`\n核对后用 --merge 并入 data/models.json，或手动挑需要的条目。`);
}
