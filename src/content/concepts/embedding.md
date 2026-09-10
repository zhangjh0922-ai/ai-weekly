---
title: "向量表示（Embedding）"
english: "Embedding"
aliases: ["嵌入", "嵌入层", "向量", "向量检索", "语义检索", "embedding", "embeddings", "embedding layer", "Sentence Embedding", "N-gram Embedding"]
category: "基础概念"
summary: "把文字等内容转换成一组数字，让程序能够比较相似程度；常用于搜索、分类与推荐，但相似不代表事实相同。"
updated: 2026-09-10
sources:
  - title: "Sentence-BERT：Sentence Embeddings using Siamese BERT-Networks"
    url: "https://arxiv.org/abs/1908.10084"
  - title: "Hugging Face：How caching works（输入表示与注意力）"
    url: "https://huggingface.co/docs/transformers/main/cache_explanation"
related: ["rag", "token", "transformer"]
---

## 给内容一个可计算的表示

Embedding 通常译作嵌入或向量表示：用一组数字表示一个词元、一段文字，或其他类型的内容。这里的“向量”可以先理解为一串有固定长度的数字，无须先学线性代数。

用于语义检索的模型会让相关内容的表示更接近，便于程序比较。例如搜索“怎样安排复习”，有机会找到写着“备考时间规划”的笔记，即使两者没有使用相同关键词。

## 它在 AI 应用中做什么

文档问答系统可以先把各段材料转换成向量。提问时再计算问题的向量，找到相关段落，交给生成模型组织答案。这是[RAG](concept:rag)可采用的一种检索方式，并非唯一方式。

模型内部也有 embedding 层，用来表示词元等输入；它与专门输出整段文字向量的检索模型，承担的任务并不完全一样。N-gram 指连续的若干个词或词元，相关 embedding 表示这类组合，具体结构还要看对应模型说明。

## 相似程度不是正确率

“允许延期”和“不允许延期”可能谈的是同一件事，却有相反结论。向量距离近，只是当前表示方法认为内容相关，不能代替事实核查。

不同模型产生的向量通常也不能直接混着比较。选取何种表示、如何切分文档、有没有结合关键词，会影响最终找到的材料。
