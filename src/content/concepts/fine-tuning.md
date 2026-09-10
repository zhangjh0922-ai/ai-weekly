---
title: 微调与继续训练
english: Fine-tuning and Continued Training
aliases: [微调, Fine-tuning, Finetuning, SFT, Supervised Fine-Tuning, 监督微调, CPT, 继续预训练, Continued Pretraining, LoRA, Low-Rank Adaptation, 低秩适配, 后训练, Post-training]
category: 模型与使用
summary: 在已有模型上继续训练，使它适应特定任务或材料；训练目标与调整哪些参数，是需要分开理解的两件事。
updated: 2026-09-10
sources:
  - title: Hugging Face：SFT Trainer
    url: https://huggingface.co/docs/trl/sft_trainer
  - title: LoRA：Low-Rank Adaptation of Large Language Models
    url: https://arxiv.org/abs/2106.09685
  - title: DeepSeekMath：Pushing the Limits of Mathematical Reasoning in Open Language Models
    url: https://arxiv.org/abs/2402.03300
related: [llm, parameters, reinforcement-learning]
---

## 在已有基础上继续学习

微调是在已有模型上继续训练，通过调整参数，让它适应特定任务、表达习惯或领域。它和在提示词里附上几份文档不同：普通对话主要改变当前输入，微调会留下训练后的参数变化。预训练之后的训练常统称后训练，其中也可能包含强化学习等不同方法。

## SFT 和 CPT 学什么

SFT 是监督微调，常用「输入与期望输出」的示例训练模型，例如给出采访原文，再提供合格摘要。CPT 是继续预训练，通常用新的领域材料延续语言建模等目标，例如继续学习数学文本。两者的数据组织和学习目标不同，实际项目也可能先后使用它们。[SFT 说明](https://huggingface.co/docs/trl/sft_trainer)与[继续预训练案例](https://arxiv.org/abs/2402.03300)

## LoRA 调整哪些部分

LoRA 的中文常译作低秩适配。它通常冻结原有权重，训练一组较小的附加参数，以减少需要训练的参数和资源。SFT 描述训练目标与示例形式，LoRA 描述怎样调整模型，所以一次训练可以同时属于 SFT 和 LoRA，并不是只能二选一。[LoRA 原论文](https://arxiv.org/abs/2106.09685)

## 用社团纪要做一个例子

你有一批统一格式的会议纪要，希望模型学会同样的栏目安排，可以把微调作为候选方法。但示例少、错误多或格式不一致时，训练未必有帮助。检查结果时应保留未参加训练的新材料，既看格式是否稳定，也看内容是否准确；记住训练样例并不等于能处理新情况。
