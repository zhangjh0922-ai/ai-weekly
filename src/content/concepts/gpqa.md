---
title: "GPQA（研究生级科学问答）"
english: "Graduate-Level Google-Proof Q&A"
aliases: [GPQA, GPQA Diamond, GPQA-Diamond, GPQA Main, GPQA Extended, Graduate-Level Google-Proof Q&A]
category: "评测与指标"
summary: "由领域专家编写的高难度科学选择题；Diamond 是经过特定筛选的子集，答对不等于具备完整科研能力。"
updated: 2026-09-10
sources:
  - title: "GPQA：原始论文与子集定义"
    url: "https://arxiv.org/pdf/2311.12022"
  - title: "GPQA：作者发布的数据集说明"
    url: "https://huggingface.co/datasets/Idavidrein/gpqa"
related: [benchmark, hle, mmlu]
---

## 专业知识与推理一起考

GPQA 是由生物、物理和化学领域专家编写的研究生级选择题。它不仅问术语的定义，还要求理解问题条件，并把专业知识用到具体判断中。

可以把它想成跨专业讨论会中的难题：即使一个人在自己的领域很熟练，面对另一个领域的问题，也可能需要先理解大量背景。这里的“专家”不是精通所有学科的统一群体。

## Diamond 是怎样选出来的

GPQA 有 Extended、Main 和 Diamond 等题集。Diamond 是包含 198 道题的子集，筛选依据包括领域专家对答案较一致，以及非本领域验证者仍较难答对。它不是给完整 GPQA 换了一个名字。

名称中的 Google-Proof 描述出题目标：让非专家即使能搜索，也不容易直接解决问题。它不表示题目由 Google 制作，也不保证答案永远无法在网上找到。

## “超过专家”要放回具体条件

比较时需要确认题集、提示方式、工具使用，以及一次作答还是多次回答后投票。原论文也提醒，筛选题目的过程会影响所报告的人类验证者表现，不能把所有人类数据视为同一把尺子。

选择正确答案能说明特定知识与推理能力，但设计实验、判断数据质量和发现新问题并不在同一分数里。它也不能直接证明模型适合承担某项专业工作。
