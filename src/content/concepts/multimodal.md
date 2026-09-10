---
title: 多模态
english: Multimodal Models
aliases: [多模态, Multimodal, VLM, Vision Language Model, 视觉语言模型, OCR, Optical Character Recognition, 光学字符识别, ASR, Automatic Speech Recognition, 自动语音识别, STT, Speech to Text, TTS, Text to Speech, 语音合成]
category: 基础概念
summary: 同时涉及文字、图像、声音等不同形式的信息，但支持哪些输入和输出、能否把它们联系起来，需要分别看。
updated: 2026-09-10
sources:
  - title: Hugging Face：Image-text-to-text
    url: https://huggingface.co/docs/transformers/tasks/image_text_to_text
  - title: PaddleOCR 官方文档
    url: https://www.paddleocr.ai/latest/en/index.html
  - title: Hugging Face：Automatic Speech Recognition
    url: https://huggingface.co/tasks/automatic-speech-recognition
  - title: Hugging Face：Text-to-Speech
    url: https://huggingface.co/tasks/text-to-speech
related: [llm, computer-use, token]
---

## 让不同形式的信息一起参与

文字、图像、音频和视频是不同的信息模态。多模态模型或系统能够处理其中多种形式，例如同时接收照片和问题，再生成文字回答。常见的 VLM 是视觉语言模型。具体支持的输入与输出要分开确认：能够看图，不意味着也能生成图片。[视觉语言模型](https://huggingface.co/docs/transformers/tasks/image_text_to_text)

## 从课堂材料看几种任务

你拍下一页讲义，希望把它转成可编辑文字，涉及 OCR，也就是光学字符识别。把课堂录音转成文字，涉及 ASR，即自动语音识别，也常叫 STT。把整理后的文字读出来，则涉及 TTS，即文本转语音。三者处理的方向不同，也可以由专用模型分别完成。[OCR](https://www.paddleocr.ai/latest/en/index.html)、[ASR](https://huggingface.co/tasks/automatic-speech-recognition)与[TTS](https://huggingface.co/tasks/text-to-speech)说明

## 识别和理解还隔着哪些步骤

模型即使读对了图表上的文字，也可能弄错坐标关系；录音转写完整，也未必正确判断谁在反驳谁。真正贴近日常的测试，可以要求它结合图像与文字解释结论，再检查引用的细节是否来自原材料，避免只用「识别出了内容」代表全部理解能力。

## 产品能力不一定来自一个模型

一个语音聊天产品可能先把声音转成文字，再交给语言模型，最后合成语音；另一些系统会更直接地处理音频。看到「多模态」标签时，可以继续了解它支持什么方向、经过哪些处理，以及最终任务是否完成。图片清晰度、噪声、语言和材料长度，也应作为对比条件记录下来。
