import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

/**
 * 一期周报 = 一个 Markdown 文件，放在 src/content/issues/ 下。
 * 文件名建议 2026-w36.md（ISO 周），slug 即文件名。
 */
const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    /** 期号，从 1 开始，必须唯一 */
    issue: z.number().int().positive(),
    /** 标题，不用带「第 N 期」，模板会自动加 */
    title: z.string(),
    /** 发布日期 */
    date: z.coerce.date(),
    /** 本期覆盖的时间区间，例如 "2026-08-25 ~ 2026-08-31" */
    range: z.string(),
    /** 一句话概述，用在列表页和分享卡片 */
    summary: z.string(),
    /** 本期最值得看的 2—4 条，列表页会直接展示 */
    highlights: z.array(z.string()).default([]),
    /** 标签，用于筛选 */
    tags: z.array(z.string()).default([]),
    /** 本期撰写/编辑的人 */
    editors: z.array(z.string()).default([]),
    /** true 时不出现在线上（本地 dev 仍可预览） */
    draft: z.boolean().default(false),
  }),
});

/**
 * 模型发布时间线。数据在 data/models.json，独立于周报维护，
 * 这样「某个模型什么时候发的」可以被单独查询和引用。
 */
const models = defineCollection({
  loader: file('./data/models.json'),
  schema: z.object({
    /** 唯一 id，同时用作页面锚点，例如 "claude-opus-5" */
    id: z.string(),
    /** 模型名，例如 "Claude Opus 5" */
    name: z.string(),
    /** 发布方，例如 "Anthropic" / "OpenAI" / "DeepSeek" */
    org: z.string(),
    /** 发布日期 YYYY-MM-DD */
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** 官方公告 / 模型卡链接 */
    url: z.url(),
    /** 一两句话：它变了什么，对学生意味着什么 */
    note: z.string(),
    /** 例如 ["开源", "多模态", "推理"] */
    tags: z.array(z.string()).default([]),
    /** 哪一期周报写过它（可选，用于互链） */
    issue: z.number().int().positive().optional(),

    /**
     * 上一代同系列模型的 id。填了之后详情区会自动算出「相比上一代变了什么」，
     * 不需要人工写 —— 数字来自双方的 specs，编不了。
     */
    prev: z.string().optional(),

    /**
     * 硬规格。由 scripts/enrich-specs.mjs 从 Hugging Face API 和模型自己的
     * config.json 抓取，全部可核实。闭源模型没有公开权重，这一项为空。
     */
    specs: z
      .object({
        /** 参数总量 */
        params: z.number().nullable().optional(),
        /** 权重文件总体积，字节 */
        weightsBytes: z.number().nullable().optional(),
        /** 上下文窗口，token 数 */
        contextTokens: z.number().nullable().optional(),
        /** 架构标识，例如 deepseek_v4 */
        architecture: z.string().nullable().optional(),
        /** MoE 专家总数 */
        experts: z.number().nullable().optional(),
        /** 每个 token 激活几个专家 */
        expertsPerToken: z.number().nullable().optional(),
        /** 权重主精度，例如 BF16 / F8_E4M3 */
        precision: z.string().nullable().optional(),
        license: z.string().nullable().optional(),
        languages: z.array(z.string()).nullable().optional(),
        modality: z.string().nullable().optional(),
        /** 配套论文的 arXiv 编号 */
        arxiv: z.string().nullable().optional(),
        downloads: z.number().nullable().optional(),
        likes: z.number().nullable().optional(),
        /** 这批数字是哪天抓的 —— 下载量会变，必须标时间 */
        fetchedAt: z.string().optional(),
      })
      .optional(),

    /**
     * 人工补充的要点，用于写清楚数字表达不了的东西。
     * 留空就只展示自动抓来的规格，不要为了填满而编。
     */
    changes: z.array(z.string()).default([]),
  }),
});

export const collections = { issues, models };
