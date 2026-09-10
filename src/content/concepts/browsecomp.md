---
title: "BrowseComp（复杂浏览检索评测）"
english: "Browsing Competition"
aliases: [BrowseComp, Browse Comp, Browsing Competition]
category: "评测与指标"
summary: "要求 AI 在网上寻找难以定位、需要拼合多条线索的信息，主要检查最终短答案，不涵盖全部研究报告质量。"
updated: 2026-09-10
sources:
  - title: "OpenAI：BrowseComp 发布说明"
    url: "https://openai.com/index/browsecomp/"
  - title: "BrowseComp：原始论文"
    url: "https://arxiv.org/abs/2504.12516"
related: [agent, benchmark, prompt-injection]
---

## 找到答案比核对答案更难

BrowseComp 是 OpenAI 提出的浏览检索基准。问题通常有简短、可核对的答案，但相关线索分散，直接输入一个关键词未必能找到，需要不断调整搜索方式、阅读网页并交叉确认。

可以类比为根据年代、地点和经历，查出某位人物的名字。难处在于逐步缩小范围，而得到名字后，验证是否符合线索往往容易得多。这只是任务结构的类比，并非原题。

## 它与写研究报告有什么不同

评测主要检查最终答案是否匹配参考答案。这个设计便于判分，却没有覆盖真实研究中常见的开放问题，例如如何取舍相互冲突的观点、说明证据强弱，或写出适合读者的长报告。

因此，高分能够提供复杂信息查找能力的证据，但不能自动推出每条引用都可靠，或整篇报告的论证已经充分。

## 工具和尝试次数会改变表现

浏览工具能访问哪些页面、搜索结果是否变化、可用时间以及重复尝试次数，都会影响结果。单次回答与生成多份答案后投票，需要分别标注。

题目和答案公开后，还要考虑训练数据接触或检索到评测答案的可能。能上网是运行条件，不能据此保证模型每次都通过独立查证得出结论。
