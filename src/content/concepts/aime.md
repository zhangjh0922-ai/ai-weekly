---
title: "AIME（美国数学邀请赛）"
english: "American Invitational Mathematics Examination"
aliases: [AIME, AIME I, AIME II, AIME 2024, AIME 2025, AIME 2026, 美国数学邀请赛, American Invitational Mathematics Examination]
category: "评测与指标"
summary: "原本面向学生的数学竞赛，其历年题目也用于测试 AI；年份、试卷、尝试次数和工具条件都影响成绩含义。"
updated: 2026-09-10
sources:
  - title: "美国数学协会：AIME 官方介绍"
    url: "https://maa.org/maa-invitational-competitions/"
  - title: "OpenAI：AIME 评测中不同采样方式的说明"
    url: "https://openai.com/index/learning-to-reason-with-llms/"
related: [frontiermath, pass-at-k, benchmark]
---

## 首先是一项数学竞赛

AIME 由美国数学协会组织，面向通过相应选拔的学生。试卷包含 15 道数学题，每题答案为 0 到 999 之间的整数。AI 报告中的“AIME”，通常指让模型解答某些年份的竞赛题。

可以把这种用法理解为拿一份历年试卷检验解题能力。它借用了竞赛的题目，但模型是在评测者设定的环境中作答，并不因此获得正式参赛成绩或竞赛资格。

## 年份与尝试次数不能省略

“AIME 2024”与“AIME 2025”是不同题目；历年的 AIME I、AIME II 也要说明是否都包含。题目数量较少时，少数题的得失就可能明显改变百分比。

一次作答、每题反复生成再取平均、多次答案投票，以及从候选中挑选答案，是不同评测方式。OpenAI 的早期研究就分别报告过这些设置，不能将它们都简称为“一次考试得分”。

## 答案正确不涵盖全部数学能力

还需确认是否允许代码计算、搜索或其他工具，以及时间和推理预算。模型的运行条件若与人类竞赛不同，成绩就只能在注明条件后作有限比较。

整数答案便于自动核对，但只检查最终数字，不能直接保证每一步论证正确。解出竞赛题可以提供数学推理的证据，却不等于能够开展未知问题研究；历年题公开后，也需要考虑训练时是否接触过相关材料。
