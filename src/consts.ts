export const SITE = {
  title: 'AI 周报',
  org: 'Emergence AI Lab',
  tagline: '每周整理 AI 新动态，关注它们对学习、工作和日常使用的影响',
  description:
    'Emergence AI Lab 的 AI 周报：整理模型发布、产品更新、研究与行业动态，附来源链接与编辑观察，关注 AI 在学习、工作和日常生活中的应用。',
  lang: 'zh-CN',
  /** 用在 footer 和 about 页 */
  repo: 'https://github.com/zhangjh0922-ai/ai-weekly',
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/issues', label: '往期' },
  { href: '/models', label: '模型时间线' },
  { href: '/concepts', label: '概念指南' },
  { href: '/about', label: '关于' },
] as const;

/** 周报条目的写作参考标签，与草稿模板保持一致 */
export const SECTION_HINTS = [
  '发生了什么',
  '为什么重要',
  '核查状态',
  '实测状态',
  '使用观察',
  '限制与待核实信息',
] as const;
