---
title: "形式化证明与验证"
english: "Formal Proof / Formal Verification"
aliases: ["形式化证明", "形式化验证", "定理证明", "证明助手", "证明检查器", "proof assistant", "theorem proving", "Lean", "Lean 4", "形式化"]
category: "评测与指标"
summary: "把命题、假设和推导写成严格的形式语言，再由程序检查是否符合逻辑规则。验证结果仍取决于实际写下的命题与假设。"
updated: 2026-09-10
sources:
  - title: "Theorem Proving in Lean 4：Introduction"
    url: "https://lean-lang.org/theorem_proving_in_lean4/introduction.html"
  - title: "Lean：Frequently Asked Questions"
    url: "https://lean-lang.org/faq/"
related: ["frontiermath", "reasoning-chain", "tool-use"]
---

## 把证明交给程序检查

普通数学证明依赖读者理解自然语言和推导。形式化证明会把定义、假设、命题及证明写成有严格语法和逻辑规则的形式，让检查器逐项验证。

Lean 是可用于这种工作的编程语言和证明助手。辅助工具可以帮助搜索证明，但最终交给较小的核心检查器验证，避免仅凭生成出来的文字判断。

## 一个简单例子

“任意两个偶数相加仍是偶数”，需要先定义偶数，再从两个数都能写成某个整数的两倍，推出它们的和也具有这一性质。形式化工作要求这些条件和推导在系统中明确成立。

AI 可以尝试生成相应证明代码，并根据检查结果修改。展示一段像证明的回答，与实际通过检查，是两种不同结果。

## 通过检查意味着什么

它说明已写下的命题可从所用假设和规则推出，还需要检查命题是否准确表达了原问题、有无未完成步骤、是否额外引入了结论作为假设。

此外，把一个已有定理的证明转写为形式语言，与发现并证明一个新的数学结论，是不同贡献。阅读“AI 证明某定理”的报道时，应确认成果属于哪一种，以及检查环境和完整产物是否公开。
