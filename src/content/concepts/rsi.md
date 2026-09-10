---
title: "递归自我改进（RSI）"
english: "Recursive Self-Improvement"
aliases: ["RSI", "递归自我改进", "递归自我提升", "自我改进", "自我进化", "AI 辅助研究"]
category: "基础概念"
summary: "AI 参与改进自身或后续系统，改进后的系统再参与下一轮改进。具体改进对象、人工参与程度和验证方式必须分别说明。"
updated: 2026-09-10
sources:
  - title: "Recursive Self-Improvement in AI：From Bounded Self-Refinement to Autonomous Research Loops"
    url: "https://arxiv.org/abs/2607.07663"
  - title: "Google DeepMind：AlphaEvolve"
    url: "https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/"
related: ["agi", "agent", "benchmark"]
---

## “递归”发生在哪里

递归自我改进讨论一种循环：AI 帮助改进模型、工具或研究流程，得到的更强系统又帮助完成下一轮改进。重点在于后续改进能力是否因此增强。

“自我改进”在新闻中用法很宽。让 AI 修改一次文章、让它生成训练数据、让它设计新算法，分别改变不同对象，不能仅凭这个词就当成同一种进展。

## 用一个具体例子理解

设想 AI 帮研究员优化训练程序，使下一次实验更快；新模型又提出更好的优化方案。如果每轮结果确实有效，且能用于下一轮，就形成了一种反馈循环。这是帮助理解概念的例子，不是对某个系统能力的断言。

DeepMind 披露的 AlphaEvolve 用模型提出程序，再由自动评估器运行、验证和评分。这说明 AI 可以参与算法改进，但不等于它已经独立掌握了全部 AI 研发流程。

## 读这类新闻先看什么

需要区分改进的是回答、运行框架、模型参数，还是研究方法；还要看谁设定目标、谁判断结果、是否需要人工筛选，以及换一组任务后收益是否仍存在。

持续改进并非循环本身就能保证。评价不准、数据质量下降、算力和实验资源限制都可能阻碍进展。“能辅助研究”与“可以无限加速自我提升”之间，仍需要更多证据。
