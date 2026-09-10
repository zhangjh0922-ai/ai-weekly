---
title: "OSWorld（桌面操作评测）"
english: "OSWorld"
aliases: [OSWorld, OS World, OSWorld-Verified, OSWorld Verified, OSWorld-V, OSWorld 2.0]
category: "评测与指标"
summary: "让 AI 在真实桌面软件中完成操作，并检查文件或应用状态；版本、观察方式和操作预算决定比较范围。"
updated: 2026-09-10
sources:
  - title: "OSWorld：项目与原始评测说明"
    url: "https://osworld-v1.xlang.ai/"
  - title: "XLANG Lab：Introducing OSWorld-Verified"
    url: "https://xlang.ai/blog/osworld-verified"
related: [computer-use, agent, terminal-bench]
---

## 在桌面软件里实际操作

OSWorld 为 AI 提供可操作的电脑环境，任务涉及浏览器、办公软件、文件管理和跨应用流程。系统根据任务指令行动，评测程序再检查文件内容或软件状态是否达到要求。

它接近“帮我把这些文件整理好，再修改表格”的实际委托。回答操作步骤只是说明方法，真正完成还需要找到界面控件、输入内容、保存结果，并处理操作中的变化。

## Verified 表示修订过题目

OSWorld-Verified 是对原有环境与任务的改进，包括修正网页变化、模糊指令和评判程序的问题。它的重点是让测试更可靠，不是宣称所有任务都无争议，也不是另一种模型名称。

项目另有 OSWorld 2.0。阅读结果时，需要确认用的是哪一版，以及是否排除了依赖外部网络的任务；只写“OSWorld”可能不足以确定实际测试范围。

## 同一个模型也可能得出不同结果

有的系统只看截图，有的还能读取界面中按钮、文字等结构信息。操作步数、屏幕设置、工具权限和网络状态也会改变任务难度，不能把这些条件造成的差异全部归给模型。

完成率说明规定任务中有多少结果通过检查，但不覆盖所有软件，也未必充分衡量误操作的代价。判断日常可用性时，完整操作记录与失败场景，通常比一张成功后的截图提供更多信息。
