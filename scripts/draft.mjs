#!/usr/bin/env node
/**
 * 把 .cache/collected.json 里的候选条目交给大模型，产出一份**待编辑的周报草稿**。
 *
 *   node scripts/draft.mjs
 *   node scripts/draft.mjs --provider=deepseek --model=deepseek-chat
 *   node scripts/draft.mjs --dry-run          # 只打印会发出去的提示词，不调 API
 *   node scripts/draft.mjs --issue=7          # 手动指定期号
 *
 * 明确的设计取舍：模型负责**筛选、归类、去重、列事实和列疑问**，
 * 不负责替你下判断。「我们实际试了什么」和「对学生有什么用」这两段
 * 一律留空并标 TODO —— 那是人的活，也是这份周报唯一不可替代的部分。
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  paths,
  readJson,
  writeText,
  writeJson,
  loadEnv,
  parseArgs,
  isoWeekSlug,
  isoDay,
  log,
} from './lib/util.mjs';
import { resolveProvider, complete, describeProvider, reportUsage } from './lib/llm.mjs';

loadEnv();

const args = parseArgs();
if (args.provider) process.env.LLM_PROVIDER = String(args.provider);
if (args.model) process.env.LLM_MODEL = String(args.model);

const collected = readJson(paths.raw);
if (!collected) {
  log.err('没有 .cache/collected.json —— 先跑 npm run collect');
  process.exit(1);
}

// 期号：命令行 > 已有最大期号 + 1
const existing = fs.existsSync(paths.issues)
  ? fs
      .readdirSync(paths.issues)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const m = fs.readFileSync(path.join(paths.issues, f), 'utf8').match(/^issue:\s*(\d+)/m);
        return m ? Number(m[1]) : 0;
      })
  : [];
const issueNo = Number(args.issue ?? (existing.length ? Math.max(...existing) + 1 : 1));

const slug = String(args.slug ?? isoWeekSlug());
const outFile = path.join(paths.issues, `${slug}.md`);

// dry-run 不写盘，不需要检查冲突
if (!args['dry-run'] && fs.existsSync(outFile) && !args.force) {
  log.err(`${outFile} 已存在。加 --force 覆盖，或用 --slug=xxx 换个文件名。`);
  process.exit(1);
}

// ---------------------------------------------------------------- 提示词

const SYSTEM = `你是一个由高中生运营的 AI 周报的**责任编辑助手**，不是撰稿人。

这份周报的读者是中学生和大学低年级学生：他们大多用过 AI 聊天工具，但不清楚模型能力边界，也不知道怎么把 AI 放进真实的学习和项目工作流。

你的任务是把一堆原始信息源条目，整理成一份**结构化的、待人类编辑的草稿**。

严格遵守以下规则：

1. **只陈述来源里有的事实。** 不要补充你记忆中的背景知识，不要推断没写的参数、价格、跑分。来源没说的，就写「来源未说明」。
2. **每条必须带原始链接。** 链接只能从输入里原样复制，一个字符都不能改，绝对不要凭印象生成 URL。
3. **区分一手和二手。** 输入里 source 是 anthropic 的条目来自 Google News 检索，是二手报道；在条目后标注「（二手报道，需回官网核对）」。
4. **不要替人类下判断。** 「我们实际试了什么」和「对学生有什么用」这两个小节，一律只输出 TODO 占位和你建议人类去验证的具体问题，不要编造使用体验。
5. **宁少勿滥。** 输入有一两百条，绝大多数不值得写。正文最多写 5—7 条，其余归到「本周其他值得一眼的」列表里。arXiv 论文除非有明显的现实影响，否则不要进正文。
6. **中文写作，不要翻译腔。** 术语首次出现给英文原文，之后用中文。不要用「赋能」「抓手」「打法」这类词。
7. **不确定就说不确定。** 你不知道一个模型是否真的更强，你只知道厂商声称什么。用「官方称」而不是直接陈述。`;

const RESPONSE_SPEC = `请严格按下面的格式输出，不要有任何额外的开场白或结语。

---
第一部分：Markdown 正文（直接从 \`## 本期速览\` 开始，不要写标题行）

结构如下：

## 本期速览

用 3—5 个短句列出本周最值得知道的事，每句一行，以「- 」开头。

## 逐条

对每条重要新闻，用这个结构（最多 5—7 条）：

### N. 条目标题

**发生了什么** —— 事实陈述，2—4 句，句末给出 [来源](原始URL)。

**为什么重要** —— 放回上下文：相对之前变了什么，或者为什么值得学生注意。2—3 句。若来源信息不足以判断，写「来源信息不足，待补」。

**我们实际试了什么** —— 固定写：\`> TODO（人工填写）：\` 后面跟 2—3 个你建议编辑实际去测的具体任务，要具体到可执行，例如「让它读一篇 20 页 PDF 并标出每个结论的原文页码」，而不是「测测它的能力」。

**对学生有什么用** —— 固定写：\`> TODO（人工填写）\`，后面可以跟一句你觉得值得考虑的角度，但要明确标成待验证。

**边界与存疑** —— 列出来源里明确提到的限制，以及你注意到的、来源没有回答的关键问题。

## 本周其他值得一眼的

一个 Markdown 列表，每行：\`- [标题](URL) —— 一句话说明（来源名）\`。控制在 10 条以内。

## 本期未覆盖

诚实列出你判断可能重要但信息不足、无法写进正文的方向，1—3 条。

---
第二部分：紧接着输出一个 \`\`\`yaml 代码块，是这一期的元信息建议（**先输出这块**，它最短也最关键）：

title: 一个具体的、不含「第N期」的标题，点出本周主线
summary: 一句话概述，40 字以内
highlights:
  - 三条要点，每条 25 字以内
tags:
  - 2—4 个标签，从「模型发布 / 工具 / 论文 / 政策 / 开源 / 多模态 / 智能体 / 行业」里选，也可另拟

---
第三部分：最后输出一个 \`\`\`json 代码块，内容是本周疑似**新模型发布**的条目，用于补进模型时间线。数组，每个对象字段：

{"id": "小写连字符短 id", "name": "模型名", "org": "发布方", "date": "YYYY-MM-DD", "url": "原始链接", "note": "一两句话：它是什么、来源说它变了什么", "tags": ["标签"]}

只放你**确信是模型/产品发布**的条目。没有就输出空数组 []。日期必须来自输入里的 published 字段，不要猜。`;

// 只把模型需要的字段发过去，省 token 也少干扰。
// collected.json 已经按「疑似发布 > 多源转载 > 源权重 > 时间」排好序，
// 所以直接截前 N 条就是截掉最不重要的那批。
const MAX_ITEMS = Number(args['max-items'] ?? 186);
const dropped = Math.max(0, collected.items.length - MAX_ITEMS);

const items = collected.items.slice(0, MAX_ITEMS).map((i) => ({
  title: i.title,
  url: i.url,
  source: i.source,
  sourceName: i.sourceName,
  category: i.category,
  published: i.published?.slice(0, 10) ?? null,
  summary: i.summary?.slice(0, 320) ?? '',
  likelyRelease: i.likelyRelease || undefined,
  alsoSeenIn: i.alsoSeenIn.length ? i.alsoSeenIn : undefined,
}));

/**
 * 往期已经写过的条目。
 *
 * 不给模型这份清单，它就会把上期写过的东西再写一遍 —— 采集是按时间窗口滚动的，
 * 同一条公告很可能连续两周都被抓到（真实案例：Fable 5.1 在第 2 期写过，
 * 第 3 期采集时官网页面又被改动，于是再次进入候选池）。
 */
function previouslyCovered() {
  if (!fs.existsSync(paths.issues)) return [];
  const out = [];
  for (const f of fs.readdirSync(paths.issues).filter((x) => x.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(paths.issues, f), 'utf8');
    const issueNo = text.match(/^issue:\s*(\d+)/m)?.[1] ?? '?';
    for (const m of text.matchAll(/^### \d+\.\s*(.+)$/gm)) {
      out.push({ issue: Number(issueNo), heading: m[1].trim() });
    }
    for (const m of text.matchAll(/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
      out.push({ issue: Number(issueNo), url: m[1] });
    }
  }
  return out;
}

const covered = previouslyCovered();
const coveredUrls = new Set(covered.filter((c) => c.url).map((c) => c.url));
const coveredHeadings = covered.filter((c) => c.heading);

// 候选里已经写过的，直接标出来，让模型知道不要重复
const itemsMarked = items.map((i) =>
  coveredUrls.has(i.url) ? { ...i, alreadyCovered: true } : i,
);
const dupCount = itemsMarked.filter((i) => i.alreadyCovered).length;

const COVERED_BLOCK = coveredHeadings.length
  ? `
<往期已写过>
以下条目在往期正文里已经作为独立小节写过。**不要再写成正文条目**；
只有当本周出现了实质性新进展（新数字、新事实、新阶段）时，才可以再写，
并且必须明确说明「相比第 N 期新增了什么」。

${coveredHeadings.map((c) => `- 第 ${c.issue} 期：${c.heading}`).join('\n')}
</往期已写过>

另外，候选条目里带 \`"alreadyCovered": true\` 的，其原始链接在往期已被引用过（共 ${dupCount} 条）。
`
  : '';

const USER_PROMPT = `这是 ${collected.rangeLabel} 期间从 ${collected.sourceCount} 个信息源抓到的 ${items.length} 条候选。

排序已经做过初步加权：likelyRelease=true 的排在前面，alsoSeenIn 表示这条被多个源同时收录（热度信号）。
${COVERED_BLOCK}
<候选条目>
${JSON.stringify(itemsMarked, null, 1)}
</候选条目>

${RESPONSE_SPEC}`;

// ---------------------------------------------------------------- 执行

if (args['dry-run']) {
  log.step('dry-run：以下是会发出去的内容');
  console.log('\n--- system ---\n' + SYSTEM);
  console.log('\n--- user（前 3000 字）---\n' + USER_PROMPT.slice(0, 3000) + '\n…');
  console.log(`\n（user 全文 ${USER_PROMPT.length} 字符，约 ${Math.round(USER_PROMPT.length / 2)} token）`);
  process.exit(0);
}

let provider;
try {
  provider = resolveProvider();
} catch (err) {
  log.err(err.message);
  console.log('\n把 .env.example 复制成 .env 并填好 key，再重试。');
  process.exit(1);
}

log.step(`生成第 ${issueNo} 期草稿`);
log.dim(`  provider：${describeProvider(provider)}`);
log.dim(`  候选 ${items.length} 条，覆盖 ${collected.rangeLabel}`);
if (dropped) log.warn(`  按 --max-items=${MAX_ITEMS} 截掉了排序最靠后的 ${dropped} 条`);
console.log();

const started = Date.now();
const mmss = () => {
  const s = Math.round((Date.now() - started) / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// 推理模型吐正文前会先想很久。不给进度的话，几分钟静默和「卡死」在终端里长得一模一样。
let thinkingShown = false;
let lastTick = 0;

let result;
try {
  result = await complete(provider, {
    system: SYSTEM,
    prompt: USER_PROMPT,
    maxTokens: Number(args['max-tokens'] ?? 32000),
    effort: String(args.effort ?? 'high'),
    onReasoning: (_piece, total) => {
      thinkingShown = true;
      if (Date.now() - lastTick < 1000) return;
      lastTick = Date.now();
      process.stdout.write(`\r  ${mmss()} 推理中… ${total.toLocaleString()} 字符  `);
    },
    onDelta: (t) => {
      if (thinkingShown) {
        process.stdout.write(`\r  ${mmss()} 推理结束，开始写正文\n\n`);
        thinkingShown = false;
      }
      process.stdout.write(t);
    },
  });
} catch (err) {
  console.log();
  log.err(err.message);
  process.exit(1);
}

console.log('\n');
log.dim(`  耗时 ${mmss()}`);
if (result.reasoningChars) {
  log.dim(`  推理 ${result.reasoningChars.toLocaleString()} 字符（不进最终稿，但一样计费）`);
}
reportUsage(result);

// ---------------------------------------------------------------- 拆解输出

const raw = result.text;

const jsonBlock = raw.match(/```json\s*([\s\S]*?)```/);
const yamlBlock = raw.match(/```ya?ml\s*([\s\S]*?)```/);

// 正文 = 去掉两个代码块之后剩下的部分
const body = raw
  .replace(/```json[\s\S]*?```/, '')
  .replace(/```ya?ml[\s\S]*?```/, '')
  .replace(/^-{3,}\s*$/gm, '')
  .trim();

const unquote = (s) => s.trim().replace(/^["']|["']$/g, '');

/**
 * 从模型返回的 yaml 块里取一个列表。
 * 只按行扫，不引 yaml 依赖 —— 模型的输出格式本来就不保证严格合法，
 * 用正则跨行匹配很容易在「列表是最后一个键」这种情况下整条失配。
 * 同时兼容行内写法 `tags: [a, b]`。
 */
function parseYamlList(text, key) {
  const lines = text.split('\n');
  const head = new RegExp(`^${key}:\\s*(.*)$`);

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(head);
    if (!m) continue;

    const inline = m[1].trim();
    if (inline.startsWith('[')) {
      return inline
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(unquote)
        .filter(Boolean);
    }

    const out = [];
    for (const line of lines.slice(i + 1)) {
      const item = line.match(/^\s*-\s*(.+?)\s*$/);
      if (item) out.push(unquote(item[1]));
      else if (line.trim() !== '') break; // 碰到下一个键就停
    }
    return out.filter(Boolean);
  }
  return [];
}

// 元信息：能解析就用模型给的，解析不了就退回占位符，绝不让脚本挂掉
const meta = { title: '', summary: '', highlights: [], tags: [] };
if (yamlBlock) {
  const y = yamlBlock[1];
  meta.title = unquote(y.match(/^title:\s*(.+)$/m)?.[1] ?? '');
  meta.summary = unquote(y.match(/^summary:\s*(.+)$/m)?.[1] ?? '');
  meta.highlights = parseYamlList(y, 'highlights');
  meta.tags = parseYamlList(y, 'tags');
}

const toYamlList = (arr) =>
  arr.length ? '\n' + arr.map((x) => `  - ${JSON.stringify(x)}`).join('\n') : ' []';

const frontmatter = `---
issue: ${issueNo}
title: ${JSON.stringify(meta.title || '待填写：本期主线')}
date: ${isoDay()}
range: ${JSON.stringify(collected.rangeLabel)}
summary: ${JSON.stringify(meta.summary || '待填写：一句话概述')}
highlights:${toYamlList(meta.highlights)}
tags:${toYamlList(meta.tags.length ? meta.tags : ["模型发布"])}
editors: []
draft: true
---

<!--
  这是脚本生成的草稿，draft: true 意味着它不会出现在线上。
  发布前请务必完成：
    1. 逐条核对链接和事实（尤其是标了「二手报道」的条目）
    2. 填掉所有「我们实际试了什么」和「对学生有什么用」的 TODO
    3. 补上 editors，把 draft 改成 false
  生成信息：${provider.name} / ${result.model} / ${new Date().toISOString()}
  候选来源：${collected.sourceCount} 个源，${items.length} 条，覆盖 ${collected.rangeLabel}
-->

`;

writeText(outFile, frontmatter + body + '\n');
log.ok(`草稿写入 ${path.relative(process.cwd(), outFile)}`);

// 模型时间线的候选条目单独存，不自动合并 —— 需要人工核对日期和链接
if (jsonBlock) {
  try {
    const proposed = JSON.parse(jsonBlock[1].trim());
    if (Array.isArray(proposed) && proposed.length) {
      const withIssue = proposed.map((m) => ({ ...m, issue: issueNo }));
      writeJson(paths.proposedModels, withIssue);
      log.ok(`${withIssue.length} 条待审核的模型时间线条目 → .cache/proposed-models.json`);
      log.dim('  核对无误后手动并进 data/models.json（注意 id 不能和已有的重复）');
    } else {
      log.dim('  本周没有识别到新的模型发布条目');
    }
  } catch {
    log.warn('模型给的 JSON 块解析失败，跳过时间线建议');
  }
}

console.log(`
下一步：
  1. 打开 ${path.relative(process.cwd(), outFile)} 逐条核对、填 TODO
  2. npm run dev  预览（draft: true 的期在本地也能看到）
  3. 改成 draft: false，提交推送
`);
