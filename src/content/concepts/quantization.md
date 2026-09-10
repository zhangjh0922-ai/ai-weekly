---
title: 数值精度与量化
english: Numerical Precision and Quantization
aliases: [量化, 数值精度, Quantization, BF16, FP16, FP8, INT4, INT8, GGUF, 低精度, 4bit, 8bit]
category: 模型与使用
summary: 用更少的位表示模型中的数值，可以降低部分存储和计算需求，但效果、速度与文件格式需要分别比较。
updated: 2026-09-10
sources:
  - title: Hugging Face：Quantization overview
    url: https://huggingface.co/docs/transformers/quantization/overview
  - title: NVIDIA：Using FP8 and FP4 with Transformer Engine
    url: https://docs.nvidia.com/deeplearning/transformer-engine/user-guide/examples/fp8_primer.html
  - title: Hugging Face：GGUF
    url: https://huggingface.co/docs/hub/gguf
related: [parameters, local-deployment, inference]
---

## 用更省空间的数值表示

量化可以理解为把较细致的数值映射成较少的取值，再用这些近似值存储或计算。它常被用于减少模型权重占用，也可以应用于运行中的其他数值。参数数量通常没有改变，改变的是每个数值的表示方式。[量化说明](https://huggingface.co/docs/transformers/quantization/overview)

## 几个常见缩写怎么读

FP16 与 BF16 都是 16 位浮点格式，但可表示的数值范围和细致程度分配不同。FP8 是 8 位浮点格式的一类叫法。INT4 表示 4 位整数；用于模型量化时，通常还需缩放系数等信息，把这些整数对应回近似数值。位数描述表示方式，并不直接等于模型效果保留的百分比。[低精度格式](https://docs.nvidia.com/deeplearning/transformer-engine/user-guide/examples/fp8_primer.html)

## 下载文件时为什么还有 GGUF

假设同一个模型提供多种下载文件，有的标 BF16，有的文件名带 Q4 和 GGUF。前者主要告诉你数值格式，Q4 一类标记涉及量化方案；GGUF 则是容纳模型数值与元数据的文件格式，可以装入不同精度的数据。它本身不是某一种固定量化精度。[GGUF 格式](https://huggingface.co/docs/hub/gguf)

## 更小不保证更快或完全等效

量化可能让笔记本装下更大的模型，但质量变化需要用实际任务检查。速度还受硬件支持、软件实现和数据转换影响。比较时可使用同一份材料，检查摘要遗漏、格式错误与等待时间；也要看量化覆盖了哪些部分，不能只凭文件体积判断全部运行内存。
