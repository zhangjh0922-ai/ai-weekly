---
title: 参数与权重
english: Parameters and Weights
aliases: [参数, 参数量, 总参数, 激活参数, 权重, Parameters, Weights, Active Parameters]
category: 模型与使用
summary: 参数是模型训练中调整的数值，数量、实际激活部分和存储精度共同影响规模，不能直接当作能力排名。
updated: 2026-09-10
sources:
  - title: Google：Machine Learning Glossary — Parameter
    url: https://developers.google.com/machine-learning/glossary#parameter
  - title: Hugging Face：Model memory estimator
    url: https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator
  - title: Mixtral of Experts
    url: https://arxiv.org/abs/2401.04088
related: [moe, quantization, local-deployment]
---

## 模型里被训练调整的数值

参数是模型在训练中学习的数值，例如神经网络里的权重和偏置。可以把它们理解为大量共同影响计算结果的设置，但通常无法把某一个参数对应成某一条知识。日常所说的「下载模型权重」，往往是获取保存这些训练结果的文件。[参数的定义](https://developers.google.com/machine-learning/glossary#parameter)

## B、T 和激活参数

参数量中的 B 表示十亿，T 表示万亿，所以 1T 等于 1000B。总参数统计整个模型的规模；MoE 模型还会标出激活参数，表示处理每个 token 时参与计算的部分。不同输入可能选择不同专家，不能因此把未激活的权重视为永远无用。[总参数与激活参数示例](https://arxiv.org/abs/2401.04088)

## 为什么数量不等于文件体积

假设有一个 8B 模型，每个参数用 16 位、也就是 2 字节存储，单算这些数值约需 16GB。换用更低精度后，文件可能变小，参数数量却没有因此减少。这个计算只是裸权重的估算，未包括额外元数据、量化辅助信息和运行缓存。[内存估算说明](https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator)

## 比较模型时还要看什么

为笔记本选模型时，需要同时检查参数量、文件格式、精度和实际运行占用；磁盘能放下，不代表内存也够用。比较回答质量时，训练材料、训练方法和任务类型同样重要。「参数翻倍」描述的是规模变化，不能直接推成准确率、知识量或速度翻倍。
