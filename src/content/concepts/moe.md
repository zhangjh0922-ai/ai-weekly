---
title: 混合专家
english: Mixture of Experts
aliases: [MoE, MOE, Mixture of Experts, 混合专家, 混合专家模型]
category: 模型与使用
summary: 让模型中的不同模块分担计算的一类架构，常以较少激活参数处理输入，但总参数仍影响部署需求。
updated: 2026-09-10
sources:
  - title: Mixtral of Experts
    url: https://arxiv.org/abs/2401.04088
  - title: Hugging Face：Mixture of Experts Explained
    url: https://huggingface.co/blog/moe
  - title: MoE-Infinity：Efficient MoE Inference on Personal Machines with Sparsity-Aware Expert Cache
    url: https://arxiv.org/abs/2401.14361
related: [token, open-weights, benchmark]
---

## 把计算分给不同模块

MoE 的中文是「混合专家」。新闻中常见的稀疏 MoE，会在模型部分层中放入多个被称作「专家」的计算模块，再由路由模块为输入选择其中几个。这样，模型可以拥有很多参数，同时让每个 token 只使用其中一部分。[Mixtral 的架构说明](https://arxiv.org/abs/2401.04088)

## 像一次分工，但不按学科排班

可以借用整理活动文档的例子：团队有很多成员，每份材料只交给部分成员处理。这个比喻只帮助理解分工；模型里的专家是网络模块，并不必然分别负责数学、写作或编程。路由通常发生在处理 token 的过程中，同一句话在不同层也可能选择不同专家。

## 两种参数量分别表示什么

「总参数」描述整个模型的规模，「激活参数」描述处理每个 token 时参与计算的部分。激活较少有助于减少计算，却不表示其余权重可以直接丢掉：后续输入仍可能用到其他专家。部署通常仍需存放整套权重，也可以通过缓存、卸载等方案在不同设备间调度。[部署中的取舍](https://arxiv.org/abs/2401.14361)

## 读新闻时别只看一个数字

因此，「只激活几个 B」不能直接换算成同样大小的显存需求，也不能断言速度、费用等于同参数量的小模型。实际开销还受共享层、路由通信、数值精度和部署方式影响。比较两款模型时，最好同时看总参数、激活参数与相同条件下的实测表现。[MoE 的计算与内存需求](https://huggingface.co/blog/moe)
