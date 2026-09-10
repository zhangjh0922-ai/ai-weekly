---
title: 强化学习
english: Reinforcement Learning
aliases: [RL, 强化学习, Reinforcement Learning, RLHF, Reinforcement Learning from Human Feedback, 人类反馈强化学习, RLVR, Reinforcement Learning with Verifiable Rewards, 可验证奖励强化学习, GRPO, Group Relative Policy Optimization, 群体相对策略优化, 奖励模型, Reward Model]
category: 模型与使用
summary: 模型根据尝试后的奖励信号调整行为；反馈来自人还是程序、如何比较结果，会影响它最终学到什么。
updated: 2026-09-10
sources:
  - title: Hugging Face：The Reinforcement Learning Framework
    url: https://huggingface.co/learn/deep-rl-course/unit1/rl-framework
  - title: Training language models to follow instructions with human feedback
    url: https://arxiv.org/abs/2203.02155
  - title: DeepSeek-R1：Incentivizing Reasoning Capability in LLMs via Reinforcement Learning
    url: https://arxiv.org/abs/2501.12948
  - title: Hugging Face：GRPO Trainer
    url: https://huggingface.co/docs/trl/grpo_trainer
related: [fine-tuning, inference, benchmark]
---

## 根据结果调整做法

强化学习简称 RL：系统尝试某种行为，收到奖励信号，再通过训练调整策略，让未来行为更可能获得较高回报。奖励在这里是计算出来的反馈，未必涉及人的表扬，也不自动代表行为在所有方面都正确。[强化学习流程](https://huggingface.co/learn/deep-rl-course/unit1/rl-framework)

## 人的偏好与可检查的答案

RLHF 使用人类反馈，例如让标注者比较两份回答，再训练奖励模型评估更多回答。RLVR 使用可验证奖励，例如用程序检查算术答案或代码能否通过测试。前者可以表达难写成规则的偏好，后者便于自动核验部分任务；奖励来自哪里，会影响模型受到怎样的引导。[人类反馈研究](https://arxiv.org/abs/2203.02155)与[规则奖励案例](https://arxiv.org/abs/2501.12948)

## GRPO 是怎样比较尝试的

GRPO 是一种强化学习优化方法。可以粗略理解为：针对同一问题生成一组候选结果，比较它们的奖励，再据此更新模型。它描述怎样利用反馈训练，不是一个独立模型，也不是另一套通用评分榜；不同任务仍需设计合适的奖励。[GRPO 方法](https://huggingface.co/docs/trl/grpo_trainer)

## 用练习题理解局限

假设训练只奖励数学题的最终数字，模型得到正确结果就能得分，但解释可能仍不完整。若程序测试覆盖不足，也可能接受有缺陷的代码。因此，「经过强化学习」不足以说明可靠性，还要看奖励是否贴近真实要求、是否用新题检查效果。普通用户每次聊天，也不意味着模型都会即时更新权重。
