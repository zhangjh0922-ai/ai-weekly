---
title: 检索增强生成
english: Retrieval-Augmented Generation
aliases: [RAG, 检索增强, 知识库问答]
category: 模型与使用
summary: 回答前先从资料库中找出相关内容，再交给模型组织答案；资料是否找对、是否读对，都会影响最终质量。
updated: 2026-09-10
sources:
  - title: RAG 论文：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    url: https://arxiv.org/abs/2005.11401
  - title: Anthropic：Contextual Retrieval
    url: https://www.anthropic.com/engineering/contextual-retrieval
related: [context-window, hallucination, tool-use]
---

## 它是什么

RAG 是检索增强生成的缩写。常见流程是先根据问题，在文档或其他资料中寻找相关片段，再把这些片段交给模型回答。[最初的 RAG 论文](https://arxiv.org/abs/2005.11401)将模型已有的知识与外部检索结合；如今这个词也常用来描述应用中的“查资料再作答”流程。

## 一个日常例子

你存有几十份活动通知，想知道哪些活动允许外校学生参加。系统先找到提及报名资格的段落，再整理成表格并标出出处。这样无需把所有通知一次塞给模型，也方便在新增通知后继续查询。

## 与长上下文和训练有何区别

长上下文描述一次能容纳多少材料，RAG 描述如何找出要使用的材料，两者可以配合。把检索结果放进本次对话，通常不会因此改写模型的权重，也不等于它永久学会了这些知识。系统本身仍可以另外训练或优化检索与生成环节。

## 为什么还会答错

资料可能过时，检索可能漏掉关键段落，模型也可能误读找到的内容。例如“允许参加”后面紧跟着资格限制，切分材料时却把后半句遗漏了。[检索研究会关注片段是否保留足够背景](https://www.anthropic.com/engineering/contextual-retrieval)。因此，有知识库和引用，并不能直接推出答案可靠；需要分别检查资料、检索结果和最终解释。
