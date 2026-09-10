---
title: 词元
english: Token
aliases: [token, tokens, Token, 词元]
category: 模型与使用
summary: 模型处理文本时使用的小片段，也是衡量输入和输出长度的常用单位，不能直接换算成固定字数。
updated: 2026-09-10
sources:
  - title: Hugging Face：Tokenization algorithms
    url: https://huggingface.co/docs/transformers/main/tokenizer_summary
  - title: Google：Understand and count tokens
    url: https://ai.google.dev/gemini-api/docs/tokens
related: [context-window, moe, benchmark]
---

## 模型怎样拆开一句话

Token 常译作「词元」，可以理解为模型处理文本时使用的小片段。分词器先按自己的规则拆分文字，再把片段转换成编号，交给模型处理。一个片段可能是完整单词、单词的一部分、标点，也可能涉及字符的字节表示。因此，一个 token 并不固定等于一个汉字或一个英语单词。[分词原理](https://huggingface.co/docs/transformers/main/tokenizer_summary)

## 写文档时会遇到什么

假设你把一份中英文混排的学习笔记交给 AI 整理。文档软件统计的字数，和模型统计的 token 数可能不同；生僻词、公式、空格和代码也会影响拆分。同一段内容换一个模型，使用不同分词器后，数量还可能变化。要知道材料有多长，最好使用对应模型的计数工具，而不是套用统一的字数比例。

## 新闻里的数量怎么看

「输入 token」通常包括发给模型的问题、材料及被带入的历史内容；「输出 token」是模型生成的内容。图片、音频等输入也可能按各自规则计数，不能只数画面中的文字。看到用量或费用比较时，需要先确认统计范围。[输入与输出计数](https://ai.google.dev/gemini-api/docs/tokens)

## 数量不能代替效果

更多 token 可以容纳更长的材料，也可能只是回复更啰嗦。比较效率时，可以看完成同一任务用了多少时间、多少 token，以及结果是否符合要求；仅凭输出长短，无法判断回答质量。
