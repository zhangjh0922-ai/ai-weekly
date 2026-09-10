---
title: 计算量、吞吐与延迟
english: Compute, throughput and latency
aliases: [FLOPs, FLOPS, FLOP/s, TFLOPS, token/s, tokens/s, TPS, TTFT, 吞吐量, 首词元延迟]
category: 评测与指标
summary: 计算量描述要做多少运算，吞吐描述一段时间处理多少内容，延迟描述要等多久；这些数字需要结合单位和测试条件理解。
updated: 2026-09-10
sources:
  - title: NVIDIA：GPU Performance Background User's Guide
    url: https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html
  - title: NVIDIA：LLM Inference Benchmarking — Fundamental Concepts
    url: https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/
related: [inference, token, speculative-decoding]
---

## FLOPs 与 FLOPS 怎么区分

常用记法中，FLOPs 表示浮点运算次数，描述计算量；FLOPS 或 FLOP/s 表示每秒浮点运算次数，描述计算速率。浮点数是计算机表示小数等数值的一种方式。资料中的大小写并不总是统一，因此要结合单位和上下文判断。硬件宣传值还可能是特定计算精度下的理论峰值。

## token/s 是快在哪里

吞吐量描述单位时间处理的内容，语言模型常用 token/s，也写作 TPS。需要区分单个请求的输出速度和所有并发请求的总速度。[NVIDIA 的评测说明](https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/)分别定义了系统与单用户视角的指标。token 也不固定等于一个汉字或英文单词。

## 延迟与日常体验

首词元延迟（TTFT）是发出请求到看到首个输出词元的等待，完整响应延迟则到最后输出结束。比如一个助手很快开始打字但生成较慢，另一个等待较久后快速写完；哪个更顺手，要结合你是在聊天还是批量整理文档判断。

## 为什么计算量少未必更快

搬运数据、排队、网络和软件实现都会影响时间。[GPU 性能文档](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html)区分了计算能力与内存带宽等限制。比较结果时应同时记录硬件、输入输出长度、并发数和测量范围；理论计算量下降不能直接换算成同等比例的实际提速。
