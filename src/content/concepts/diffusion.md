---
title: "扩散模型"
english: "Diffusion Model"
aliases: ["扩散", "扩散模型", "Diffusion", "DDPM", "潜空间", "潜在空间", "latent space", "LDM", "Latent Diffusion", "去噪", "生图"]
category: "基础概念"
summary: "通过学习逐步去除噪声来生成数据的一类模型，常见于图像生成。它描述生成方法，不能单独决定成品风格或质量。"
updated: 2026-09-10
sources:
  - title: "Denoising Diffusion Probabilistic Models"
    url: "https://arxiv.org/abs/2006.11239"
  - title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    url: "https://arxiv.org/abs/2112.10752"
related: ["prompt", "multimodal", "benchmark"]
---

## 从噪声逐步生成画面

经典扩散模型的训练过程会给数据加入不同程度的噪声，让模型学习如何去噪。生成时从随机噪声出发，经过逐步处理得到图像等结果。

可以把它想象成把杂乱画面逐渐整理出结构，但这只是类比：生成一张新图时，并不是先藏好某张完整原图，再把它擦出来。

## 提示词与潜空间有什么作用

文字提示可以作为条件，引导模型生成符合描述的内容。潜空间扩散先把图片压缩成较紧凑的数字表示，在这个表示里进行生成，再还原成图片，有助于降低计算量。

这里的“潜空间”可以先理解为模型使用的压缩表示；它不是图片文件夹，也不是装着完整素材的图库。

## 对比生图时还要看什么

扩散是一类方法，不是统一的审美风格。训练材料、模型设计和生成设置都会影响结果；不能仅凭一张图认定其底层一定采用哪种架构。

给不同系统相同提示词时，可以分别展示风格偏好，并检查文字是否正确、物体数量与位置是否符合要求。还应记录尺寸、生成次数和筛选方式。同一系统多次生成也可能不同，只挑最好的一张容易掩盖它的稳定性。
