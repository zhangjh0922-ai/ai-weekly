---
title: 模型许可
english: Model License
aliases: [模型许可, 许可证, License, Licence, MIT, Apache-2.0, Apache 2.0, 自定义许可, 商用许可]
category: 模型与使用
summary: 说明模型及相关文件可以怎样使用、修改和分发；允许下载与允许某种用途，是需要分别确认的条件。
updated: 2026-09-10
sources:
  - title: Open Source Initiative：The MIT License
    url: https://opensource.org/license/mit
  - title: Apache Software Foundation：Apache License Version 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0
  - title: Meta：Llama 3.3 Community License Agreement
    url: https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct/blob/main/LICENSE
related: [open-weights, local-deployment, fine-tuning]
---

## 文件能下载，接下来怎样使用

许可说明发布者允许他人怎样使用、修改和分发材料，以及需要满足哪些条件。一个模型项目里，运行代码、权重和数据可能适用不同条款。看到仓库首页的许可名称时，要确认它覆盖哪些文件；开放权重描述获取方式，不能代替具体用途的授权。

## MIT 和 Apache-2.0

MIT 允许广泛的使用、修改和分发，包括商业用途，但要求在副本或重要部分中保留版权与许可声明。Apache-2.0 也提供较宽的授权，并明确涉及专利授权；再分发时还需遵守附带许可、标明修改、保留相关声明等条件。两者都不能简单概括成「没有限制」。[MIT 原文](https://opensource.org/license/mit)与[Apache-2.0 原文](https://www.apache.org/licenses/LICENSE-2.0)

## 自定义许可要看具体条款

有些模型采用发布者自定的许可，可能对用途、再分发或特定规模的商业使用作出要求。例如 Llama 3.3 的许可包含额外商业条款。名称里出现某个熟悉的许可词，也不代表修改后的文本仍与标准版本相同。[自定义许可示例](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct/blob/main/LICENSE)

## 做一个工具时怎样阅读

假设你下载模型制作社团问答工具，可以先分清自己只是运行模型，还是会发布修改后的权重、打包程序或提供收费服务，再查看相应条款。引用新闻时也可写出完整许可名称和适用部分。许可允许某种使用，不等于模型输出准确，也不自动保证训练材料和所有第三方内容不存在其他权利问题。
