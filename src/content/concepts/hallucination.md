---
title: 幻觉
english: Hallucination
aliases: [Hallucination, AI 幻觉, 模型幻觉, 事实性]
category: 基础概念
summary: AI 生成看似合理却不符合事实或所给材料的内容；回答流畅、语气肯定、带有链接，都不能单独证明内容可靠。
updated: 2026-09-10
sources:
  - title: Anthropic：Reduce hallucinations
    url: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
related: [rag, prompt, benchmark]
---

## 它是什么

AI 讨论中的“幻觉”，常指生成了不符合事实，或与给定材料不一致的内容，例如编造一篇论文、给真实作者配上错误引文。这个词描述的是输出问题，并不意味着 AI 有人类的感知体验。不同评测对幻觉的划分可能不同，阅读数字时要看具体如何判定。

## 一个日常例子

你请 AI 把活动介绍整理成 Word 文档，原文只说“下个月举行”，它却补上了具体日期和会场。即使整篇通知写得自然，这两个细节也没有材料支持。如果要求本来就是写虚构故事，合理的情节创作则不能直接算作事实幻觉。

## 自信与正确是两回事

语气肯定只能说明表达方式，不能证明事实已经核对。“我有九成把握”也未必是经过校准的正确概率。单次算错、引用过期资料和编造来源，都可能导致错误答案，但排查时应分别确认原因，不能从一个“幻觉”标签推断内部机制。

## 怎样减少影响

可以要求区分已知事实、推测和材料未说明的部分，并给出能支持结论的出处。链接本身也要打开核对：页面真实存在，不代表它支持旁边那句话。[官方建议包括允许承认不确定、依据原文作答和验证引用](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)，同时明确这些措施无法消除所有幻觉。
