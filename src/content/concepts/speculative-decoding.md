---
title: 投机解码与多词元预测
english: Speculative decoding and multi-token prediction
aliases: [Speculative decoding, 投机解码, MTP, Multi-token prediction, 多词元预测, Draft model, 草稿模型]
category: 模型与使用
summary: 先提出多个候选词元，再由目标模型校验，以减少逐个生成的等待；多词元预测可以帮助生成候选，但两者并非同一个概念。
updated: 2026-09-10
sources:
  - title: 论文：Fast Inference from Transformers via Speculative Decoding
    url: https://arxiv.org/abs/2211.17192
  - title: 论文：Better & Faster Large Language Models via Multi-token Prediction
    url: https://arxiv.org/abs/2404.19737
related: [inference, token, compute-metrics]
---

## 投机解码怎样加速

语言模型通常逐个生成词元。投机解码先用开销较小的方法提出一段候选，再交给目标模型一起校验，接受符合规则的部分，必要时修正后继续。候选可以来自另一个较小的“草稿模型”。[经典论文](https://arxiv.org/abs/2211.17192)给出的校验和采样方法可以保持目标模型的输出分布。

## 一个直观例子

可以想象你在写活动通知时，先由助手续写几个词，再一起审核这些续写。若多数都合适，就能减少来回等待；如果经常需要重写，预先起草也会产生额外工作。这个例子帮助理解分工，实际算法校验的是词元概率，而不是让模型逐句评价文笔。

## MTP 与它有什么关系

MTP 是多词元预测，指训练或设计模型预测后面多个词元。[相关论文](https://arxiv.org/abs/2404.19737)使用共享主体上的多个输出部分完成预测。它可以为投机解码提供候选，但投机解码也可以使用独立草稿模型等方法。看到“MTP 层”，不能直接断定已经启用了某种加速实现。

## 为什么加速幅度不同

效果取决于候选被接受的比例、额外计算、硬件与同时处理的请求数量。保持采样分布也不等于每次随机生成的文字逐字相同。阅读“提速几倍”时，应核对测试条件、是否保持原有生成规则，以及测的是单人等待时间还是整体吞吐量。
