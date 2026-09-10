---
title: 开放权重
english: Open Weights
aliases: [Open Weights, open weights, 开放权重, 开源权重, 开放模型权重]
category: 模型与使用
summary: 公开训练后的模型参数，让他人有机会自行运行或修改；代码、训练资料、许可和硬件条件仍需分别确认。
updated: 2026-09-10
sources:
  - title: Open Source Initiative：The Open Source AI Definition 1.0
    url: https://opensource.org/ai/open-source-ai-definition
  - title: Meta：Llama 3.3 Community License Agreement
    url: https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct/blob/main/LICENSE
  - title: Hugging Face：Big Model Inference
    url: https://huggingface.co/docs/accelerate/main/en/usage_guides/big_modeling
related: [moe, context-window, agent]
---

## 公开的是模型的哪一部分

权重是模型经过训练得到的一组参数，影响它怎样处理输入、生成结果。「开放权重」通常表示发布者提供这些参数，供他人获取。配合模型结构和运行代码，使用者有机会自行部署或进一步调整模型；这些条件需要分别确认。

## 用自己的电脑整理材料

假设你想在本地整理采访记录。拿到权重后，还需要能运行该模型的软件，以及足够的内存、存储和计算资源。下载完成并不等于电脑就能流畅运行。把权重分配到显卡、内存甚至磁盘上，可能让设备装下更大的模型，但数据搬运也会增加等待时间。[模型部署说明](https://huggingface.co/docs/accelerate/main/en/usage_guides/big_modeling)

## 和完全开源有什么区别

只提供训练后的参数，未必提供训练代码、数据说明或复现训练所需的信息。按 OSI 的《开放源代码人工智能定义 1.0》，开放要求还涉及代码、参数和数据相关信息，以及使用、研究、修改、分享的自由。阅读发布公告时，最好具体看开放了哪些部分，而不只看「开源」标签。[OSI 定义](https://opensource.org/ai/open-source-ai-definition)

## 可以怎样用，要看许可

开放权重也不自动意味着任意商用或无条件再分发。不同许可可能约定署名、分发方式、使用范围，或要求某些情况另行获得授权；例如 Meta 的 Llama 3.3 许可包含额外商业条款。了解一个模型时，可以分别确认文件是否可获取、用途是否允许，以及设备是否适合运行。[许可示例](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct/blob/main/LICENSE)
