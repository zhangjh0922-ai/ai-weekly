---
title: "提示词缓存与 KV 缓存"
english: "Prompt Caching / KV Cache"
aliases: ["提示词缓存", "缓存读取", "缓存写入", "缓存过期", "缓存命中", "cache hit", "cache read", "cache write", "KV cache", "KV-cache", "KV 缓存", "前缀缓存", "Key", "Value"]
category: "模型与使用"
summary: "复用已经处理过的输入所对应的计算结果，减少重复计算；提示词缓存是一种使用机制，KV 缓存是相关的底层技术。"
updated: 2026-09-10
sources:
  - title: "Anthropic：Prompt caching"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
  - title: "Hugging Face：How caching works"
    url: "https://huggingface.co/docs/transformers/main/cache_explanation"
related: ["token", "context-window", "inference"]
---

## 为什么同一段材料不用反复算

假设你把一份长报告交给 AI，依次问摘要、风险和待办事项。每次请求的开头都有相同报告。提示词缓存可以复用这段相同前缀的计算结果，让后续请求少做重复工作。

它通常复用的是输入的处理结果，新问题的回答仍需生成。把旧答案直接拿来回答相似问题，是另一种缓存方式。

## KV 缓存是什么

在常见的逐词元生成模型中，注意力计算会用到前文产生的键和值，英文分别是 Key、Value，合称 KV。保存这些中间数据，后面生成文字时就不用把同一部分重新算一遍。

KV 缓存既可用于一次生成内部，也可用于跨请求复用相同前缀。它会占用内存或显存，长对话和同时处理的请求增多，都可能增加存储需求。

## 新闻里的缓存价格怎么看

一些 API 会分别列出缓存写入和缓存读取价格。实际节省取决于重复输入有多少、是否命中缓存、有效期以及厂商规则，不能把缓存折扣直接当成整次任务的降价幅度。

改动前缀、缓存过期或不满足条件，都可能需要重新处理。缓存也不会扩大[上下文窗口](concept:context-window)，或让模型永久学会这份报告；它解决的是计算复用问题。
