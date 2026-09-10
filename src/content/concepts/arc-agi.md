---
title: "ARC-AGI（推理评测）"
english: "Abstraction and Reasoning Corpus for Artificial General Intelligence"
aliases:
  - "ARC-AGI"
  - "ARC-AGI-1"
  - "ARC-AGI-2"
  - "ARC-AGI-3"
category: "评测与指标"
summary: "关注从少量信息中学习新规则的评测系列；早期版本使用网格题，第三版加入交互环境，分数含义有所不同。"
updated: 2026-09-10
sources:
  - title: "ARC Prize：ARC-AGI 系列与设计理念"
    url: "https://arcprize.org/arc-agi"
  - title: "ARC Prize：ARC-AGI-1"
    url: "https://arcprize.org/arc-agi/1"
  - title: "ARC Prize：ARC-AGI-2"
    url: "https://arcprize.org/arc-agi/2"
  - title: "ARC Prize：ARC-AGI-3"
    url: "https://arcprize.org/arc-agi/3"
related:
  - "agi"
  - "benchmark"
  - "agent"
---

## 它想观察什么

ARC-AGI 是一组关注学习与泛化能力的评测：给出少量新信息，系统能否找出规则，再把规则用到没见过的情况中。这里的“泛化”，可以简单理解为换了题目仍能运用学到的方法。

这套评测尽量减少对专业知识的依赖，强调形状、位置、数量和关系等线索。不过，这是一种关于如何测量智能的设计选择，并不是对全部人类能力的完整覆盖。

## 不同版本做的事情不同

ARC-AGI-1 和 ARC-AGI-2 采用彩色网格任务：先看几组输入与输出示例，再为新的输入生成结果。可以把简单示意想成“观察图形变化，推断转换规则”；第二版还强调符号含义、多个规则的组合及规则随情境变化。

ARC-AGI-3 则加入可交互的环境。系统需要尝试动作、观察反馈，逐渐弄清规则与目标，并调整后续行动。它不只是对一张静态网格作答，评测也关注完成任务的效率。

## 怎样理解成绩

版本号是成绩的一部分。第一、二版的解题结果与第三版的交互效率，不能只因都显示百分数就直接比较；还需看测试集、尝试次数和资源限制。

项目方将这套任务用于研究通用智能，但其中的高分不等于获得了公认的 AGI 认证。成绩说明系统在特定任务和规则下的表现，不能直接推出它在写作、科学研究或现实工作中同样可靠。
