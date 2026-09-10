---
title: "GDPval（工作产物评测）"
english: "GDPval"
aliases: [GDPval, GDPval-AA, GDPval AA, GDPval-AA v2, GDPval Gold]
category: "评测与指标"
summary: "考察 AI 能否根据资料完成职业任务中的文档、表格等产物；OpenAI 与 Artificial Analysis 的评判方式不同。"
updated: 2026-09-10
sources:
  - title: "OpenAI：GDPval 发布说明"
    url: "https://openai.com/index/gdpval/"
  - title: "Artificial Analysis：GDPval-AA 方法说明"
    url: "https://artificialanalysis.ai/methodology/intelligence-benchmarking"
related: [agent, benchmark, osworld]
---

## 从答题转向交付文件

GDPval 是 OpenAI 提出的职业任务评测。任务带有背景资料和参考文件，要求产出文档、幻灯片、表格等成果，覆盖多个知识工作职业。它更接近一次有明确要求的工作委托。

例如，可以把任务结构类比为“根据这份资料整理一份可交给同事使用的报告”。除了文字是否通顺，还要看是否满足要求、信息是否准确、文件是否便于使用。

## GDPval-AA 是另一套运行方式

OpenAI 的原始研究由行业专家盲评模型与人类的工作产物。GDPval-AA 则是 Artificial Analysis 基于公开 gold 子集运行的独立评测框架，不是把 OpenAI 的结果复制到另一张榜单。

GDPval-AA v2 使用自己的工具环境和模型评判流程，通过两份产物之间的比较计算 Elo。这个数值表示相对表现，不能当作答对百分比，也不能直接换算为 OpenAI 所报的胜出或持平比例。其 v1 与 v2 的环境和评判设置也有变化。

## 完成任务不等于接替整个职业

这些评测提供了任务与资料，真实工作却常常需要先澄清需求、协调他人、反复修改，并承担结果的责任。原始 GDPval 也明确承认，单次交付没有覆盖这些完整流程。

因此，分数适合帮助观察特定工作产物的质量。它本身不表示对 GDP 的实际贡献，也不是某个职业可以被替代的比例；模型、工具、评判者与版本仍需一起看。
