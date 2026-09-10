---
title: 注意力与 Transformer
english: Attention and Transformer
aliases: [Transformer, Transformers, 注意力, 注意力机制, 自注意力, Attention, Self-Attention, Dense, 稠密模型]
category: 基础概念
summary: 注意力让模型结合不同位置的信息，Transformer 把它组织进多层网络；稠密与混合专家是另一种区分。
updated: 2026-09-10
sources:
  - title: Attention Is All You Need
    url: https://arxiv.org/abs/1706.03762
  - title: Hugging Face：How do Transformers work?
    url: https://huggingface.co/learn/llm-course/chapter1/4
  - title: Hugging Face：Mixture of Experts Explained
    url: https://huggingface.co/blog/moe
related: [llm, context-window, moe]
---

## 让不同位置的信息联系起来

注意力机制会根据当前处理的内容，对其他位置的信息赋予不同权重，再组合起来。自注意力表示这些信息来自同一条输入序列。这里的「注意力」是一种计算方式，不能直接理解成人的专注、意识或主动判断。[Transformer 原论文](https://arxiv.org/abs/1706.03762)

## 读一句话时的例子

读「小林把书放进背包，因为它太重了」时，需要结合前后文判断「它」指什么。注意力提供了让模型联系不同词语信息的机制，但不会自动消除句子的歧义。即使模型给出了确定答案，也仍需检查原句是否真的支持唯一解释。

## Transformer 是怎样的结构

Transformer 是一类神经网络架构，将注意力、前馈计算等模块组织成多层结构。不同版本可以侧重理解输入、生成输出，或结合两者；今天看到的模型也未必照搬最初的完整结构。架构描述计算怎样组织，训练得到的权重则决定具体计算使用哪些数值。[架构与权重](https://huggingface.co/learn/llm-course/chapter1/4)

## Dense 和 Transformer 不在同一层面

发布说明中的 Dense 常译作「稠密」，通常与稀疏 MoE 相对：相关计算层使用固定的参数路径，而不是为每个 token 只选部分专家。Transformer 可以采用稠密前馈层，也可以换入 MoE 层；两种叫法并不互斥。因此，比较架构新闻时，要先分清它说的是整体结构、注意力方法，还是专家如何参与计算。[MoE 与 Transformer](https://huggingface.co/blog/moe)
