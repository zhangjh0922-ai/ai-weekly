---
title: 大语言模型
english: Large Language Model
aliases: [LLM, LLMs, 大语言模型, 语言大模型, 预训练, Pretraining, Base, 基础模型, Instruct, 指令模型]
category: 基础概念
summary: 从大量材料中学习语言规律的模型，预训练建立基础能力，后续训练再调整它如何回应具体指令。
updated: 2026-09-10
sources:
  - title: Hugging Face：How do Transformers work?
    url: https://huggingface.co/learn/llm-course/chapter1/4
  - title: Training language models to follow instructions with human feedback
    url: https://arxiv.org/abs/2203.02155
related: [token, fine-tuning, transformer]
---

## 从大量材料中学习规律

大语言模型简称 LLM，是通过大量材料训练、用来处理语言任务的模型。常见生成式模型会学习根据前文预测后续 token；反复训练会调整内部参数，让它逐渐掌握语言表达及材料中的各种规律。这是训练目标的描述，并不表示它每次回答都在复制某一篇文章。[训练基础](https://huggingface.co/learn/llm-course/chapter1/4)

## 预训练、Base 和 Instruct

预训练通常是大规模学习的起点。同一系列名称中的 Base，常指尚未针对指令对话进行后续训练的基础版本；它可能更倾向于续写给定文本。Instruct 或 Chat 版本则经过进一步训练，学习根据请求作答、遵循格式或参与对话。具体训练方法仍要看模型说明，不能只凭后缀推断全部过程。[指令训练研究](https://arxiv.org/abs/2203.02155)

## 用整理笔记来理解

假设你输入「把这段课堂笔记整理成三条重点」。基础版本可能接着续写类似的题目或材料，指令版本通常更适合按要求列出重点。这个例子说明训练方向会影响使用方式；同一个系列的不同版本，并非只在参数大小上有区别。

## 会表达仍可能出错

模型能生成流畅的解释，却仍可能误解问题、遗漏条件或编出事实。较大的模型也不天然更会遵循你的意图。阅读新闻时，可以同时看它属于哪个系列、经过什么后续训练，以及在具体任务中的结果。聊天产品里的搜索、文件处理和记忆功能，还可能由模型之外的软件提供。
