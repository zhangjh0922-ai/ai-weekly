export const SITE = {
  title: 'AI 周报',
  org: 'Emergence AI Lab',
  tagline: '每周追踪模型发布与 AI 变化，并给出学生视角的判断',
  description:
    '由学生维护的 AI 周报：每周记录重要的模型发布、产品更新、论文和行业事件，并回答「发生了什么 / 为什么重要 / 我们实际试了什么 / 对学生有什么用 / 它仍有哪些边界」。',
  lang: 'zh-CN',
  /** 用在 footer 和 about 页 */
  repo: 'https://github.com/zhangjh0922-ai/ai-weekly',
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/issues', label: '往期' },
  { href: '/models', label: '模型时间线' },
  { href: '/about', label: '关于' },
] as const;

/** 周报正文里那五个固定小节，用于单期页自动生成目录 */
export const SECTION_HINTS = [
  '发生了什么',
  '为什么重要',
  '我们实际试了什么',
  '对学生有什么用',
  '它仍有哪些边界',
] as const;
