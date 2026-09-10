---
title: 上下文窗口
english: Context Window
aliases: [Context Window, context window, 上下文窗口, 上下文长度]
category: 模型与使用
summary: 模型生成回答时能同时参考的信息容量，影响长文档和连续对话，但不等于长期记忆或理解效果。
updated: 2026-09-10
sources:
  - title: Anthropic：Context windows
    url: https://platform.claude.com/docs/en/build-with-claude/context-windows
  - title: Lost in the Middle：How Language Models Use Long Contexts
    url: https://arxiv.org/abs/2307.03172
  - title: Anthropic：Retrieval augmented generation for projects
    url: https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects
related: [token, agent, benchmark]
---

## 一次能摊开多少材料

上下文窗口是模型生成回答时能同时参考的信息容量，通常用 token 衡量。可以把它想成一张工作桌：问题、资料、被带入的聊天记录都占地方，生成的回答通常也需要预留空间。模型训练时学到的内容，不是逐份摆在这张桌上的材料。[窗口如何工作](https://platform.claude.com/docs/en/build-with-claude/context-windows)

## 整理一份长报告

假设你上传多章 AP 复习笔记，再要求比较前后两章的概念。较大的窗口有机会让更多原文同时进入模型，减少反复分段。不过，文件上传成功只说明产品接收了文件；它可能抽取部分内容、先做摘要，或搜索相关段落。模型实际参考了什么，还取决于产品怎样处理材料。[文档检索的例子](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)

## 能放下不等于能用好

读「支持超长上下文」的新闻时，可以继续看测试做了什么：从文章里找一句话，和综合多个章节解释矛盾，要求不同。《Lost in the Middle》曾在所测模型中发现，相关信息的位置会影响表现。这说明容量与有效利用能力需要分别检查，不能把当年的具体结果直接套给所有新模型。[研究原文](https://arxiv.org/abs/2307.03172)

## 和长期记忆的区别

窗口主要描述当前这次处理能容纳多少信息。产品跨对话保存的偏好、笔记或任务进度，需要另外保存，并在需要时重新带入。即使聊天可以一直继续，较早的内容也可能已经被压缩或移出；窗口变大，并不自动意味着模型会永久记住全部对话。
