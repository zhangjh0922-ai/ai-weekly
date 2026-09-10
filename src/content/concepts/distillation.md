---
title: 知识蒸馏
english: Knowledge distillation
aliases: [Distillation, Knowledge distillation, 蒸馏, Teacher model, Student model, OPD, On-policy distillation]
category: 模型与使用
summary: 用教师模型提供的输出或训练信号来训练学生模型，常用于降低使用成本；学生能学到多少，取决于数据、方法和自身能力。
updated: 2026-09-10
sources:
  - title: 论文：Distilling the Knowledge in a Neural Network
    url: https://arxiv.org/abs/1503.02531
  - title: Thinking Machines Lab：On-Policy Distillation
    url: https://thinkingmachines.ai/blog/on-policy-distillation/
related: [open-weights, reasoning-chain, benchmark]
---

## 它是什么

知识蒸馏用一个或多个“教师”模型提供的输出来训练“学生”模型，也可以学习教师对不同答案的倾向。教师与学生指训练中的角色。学生经常更小、运行成本更低，但这不是定义的硬性条件。[经典论文](https://arxiv.org/abs/1503.02531)研究了如何把多个模型的预测能力迁移到更便于部署的单个模型。

## 一个日常例子

假设要做一个整理活动通知的小助手。开发者可以让能力较强的模型给出大量提取示例，再训练另一个模型学会识别时间、地点和报名条件。完成训练后，学生可以自己处理通知，不需要每次都把请求转交给教师。这是训练过程，也不等于把示例贴进一次聊天。

## OPD 指什么

On-policy distillation 常缩写为 OPD。[Thinking Machines 的方法介绍](https://thinkingmachines.ai/blog/on-policy-distillation/)中，学生先按当前能力生成答案，教师再针对学生实际生成的过程提供细粒度训练信号。它关注学生自己会遇到的状态，与只模仿一批预先准备好的教师答案有所区别。

## 能力会完整复制吗

不能这样保证。教师的错误可能进入训练，学生也可能只学到某些任务或表达习惯。要判断蒸馏效果，应查看未用于训练的任务、实际成本和失败案例。某项考试分数接近教师，并不说明所有能力都相同；“蒸馏”这个标签本身也不能说明训练材料是否开放。
