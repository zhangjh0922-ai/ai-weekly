---
title: 本地部署
english: Local Deployment
aliases: [本地部署, 本地运行, 离线模型, Local Deployment, GPU, Graphics Processing Unit, 图形处理器, 显卡, 显存, VRAM, Ollama, vLLM, SGLang, Hugging Face, HF]
category: 模型与使用
summary: 在自己使用的设备上运行模型，需要同时匹配权重、运行软件和硬件；本地界面也可能连接云端计算。
updated: 2026-09-10
sources:
  - title: Ollama：Quickstart
    url: https://docs.ollama.com/quickstart
  - title: vLLM 官方文档
    url: https://docs.vllm.ai/en/latest/
  - title: SGLang 官方文档
    url: https://docs.sglang.io/
  - title: Hugging Face：The Model Hub
    url: https://huggingface.co/docs/hub/models-the-hub
  - title: Hugging Face：Big Model Inference
    url: https://huggingface.co/docs/accelerate/main/en/usage_guides/big_modeling
related: [open-weights, quantization, model-license]
---

## 把计算放在自己的设备上

本地部署是让模型在自己使用的电脑等设备上运行。你需要模型权重、能够加载它的软件，以及适配的硬件。GPU 是擅长并行计算的处理器，显卡中的 GPU 常用于加速模型；显存是它运行时存放权重和中间数据的空间，与磁盘剩余容量不同。[模型如何装入设备](https://huggingface.co/docs/accelerate/main/en/usage_guides/big_modeling)

## 几个工具名称各指什么

Hugging Face 的模型平台用于发布、查找和获取模型文件及说明。Ollama 可以帮助管理和运行模型，也提供云端模型选项。vLLM、SGLang 是推理与服务框架，常用于把模型作为可供程序调用的服务。它们是平台或运行工具，不能直接当成某一个模型名称。[模型平台](https://huggingface.co/docs/hub/models-the-hub)、[Ollama](https://docs.ollama.com/quickstart)、[vLLM](https://docs.vllm.ai/en/latest/)与[SGLang](https://docs.sglang.io/)

## 用离线整理采访记录做例子

如果希望材料在本机处理，可以选择适合设备的模型与运行方式，再确认实际请求是否发往远程服务。本地应用也可能调用云端模型或搜索工具，不能只看窗口开在哪里。完全离线的流程还需要提前准备模型文件，并确认所需功能不依赖网络。

## 装得下与用得顺有区别

部分方案可以把权重放到内存或磁盘，再在需要时搬运；这样可能降低显存门槛，却增加等待时间。长上下文、同时处理多个请求也会影响资源需求。评估时可以记录实际材料长度、响应速度和结果质量，并核对模型格式与软件支持，避免仅按参数量或显卡名称判断能否顺畅运行。
