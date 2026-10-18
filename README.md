# AI 周报 · Emergence AI Lab

每周整理 AI 新动态，关注它们对学习、工作和日常使用的影响。

站点用 [Astro](https://astro.build) 构建，内容是 Markdown，同时部署在 GitHub Pages 和腾讯云 EdgeOne Pages。
附带一套「采集 → AI 成稿 → 人工核对」的流水线，**AI 只做筛选和整理，判断和实测由人来写**。

---

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:4321 。`draft: true` 的期在本地能看到，但不会出现在线上。

---

## 目录结构

```
├── src/
│   ├── content/issues/        每一期周报，一个 Markdown 文件
│   ├── content.config.ts      frontmatter 的字段定义与校验
│   ├── pages/                 首页 / 往期 / 单期 / 模型时间线 / 标签 / 关于 / RSS
│   ├── layouts/               页面骨架
│   ├── components/            期号卡片
│   └── styles/global.css      全部样式，含深色模式
├── data/models.json           模型时间线数据（含规格与版本谱系）
├── scripts/
│   ├── sources.json           信息源清单
│   ├── collect.mjs            抓周报候选条目（不调用大模型）
│   ├── harvest-models.mjs     抓模型发布，补时间线（不调用大模型）
│   ├── enrich-specs.mjs       给时间线条目补硬规格（不调用大模型）
│   ├── check-links.mjs        体检所有外链是否还活着
│   ├── draft.mjs              生成草稿（调用大模型）
│   ├── new-issue.mjs          手写一期时生成空模板
│   ├── list-models.mjs        问端点要真实可用的模型 ID
│   └── lib/llm.mjs            厂商无关的大模型调用层
└── .github/workflows/
    ├── deploy.yml             推送到 main 自动部署
    └── weekly-draft.yml       每周一自动生成草稿并开 PR
```

---

## 每周的实际流程

### 1. 采集

```bash
npm run collect
```

从 `scripts/sources.json` 里的信息源抓最近 7 天的条目，去重、按「疑似模型发布」加权排序，写到 `.cache/collected.json`。**这一步不调用任何大模型，不花钱。** 每个源最多尝试 3 次；单个源失败会写进采集结果，不影响其他来源。

```bash
npm run collect -- --days=14      # 换时间窗口
npm run collect -- --check        # 体检所有源是否还活着
npm run collect -- --only=openai,qwen
```

源会失效。每隔一阵跑一次 `--check`，挂掉的直接从 `sources.json` 里删或换地址。

### 2. 生成草稿

```bash
npm run draft
```

把候选交给大模型，产出 `src/content/issues/<年份>-w<周>.md`，自动带好 frontmatter 和 `draft: true`。

```bash
npm run draft -- --dry-run                    # 只看会发出去什么，不调 API
npm run draft -- --sources-only               # 只整理来源候选，不调用模型
npm run draft -- --provider=deepseek          # 临时换厂商
npm run draft -- --issue=7 --slug=2026-w40    # 手动指定期号和文件名
```

未配置 API 密钥时，会自动生成一份 `draft: true` 的来源候选稿，包含原始标题、链接、摘要与日期，供编辑筛选和撰写；它不是已核查的周报正文。配置了密钥时保留模型成稿流程，API 调用失败不会被伪装成成功。

模型成稿时会把识别到的新模型发布写到 `.cache/proposed-models.json`，**不会自动并进 `data/models.json`** —— 日期和链接必须人工核对过再合并。来源候选模式不生成模型提案。

### 3. 编辑与核查

草稿中的「核查状态」「实测状态」「使用观察」留作 TODO，由编辑根据实际记录填写。查阅公告和核对引用属于来源核查，实际使用模型或工具才属于实测。没有上手也可以报道，但须明确标注「未实测」。

发布前的检查项：

- [ ] 逐条核对链接和事实，尤其是标了「二手报道」的
- [ ] 填写核查与实测状态；整期均未实测时，可在正文开头统一说明
- [ ] 补充有依据的使用观察，移除所有 TODO 和编辑提示
- [ ] 核对 `.cache/proposed-models.json` 后并进 `data/models.json`（注意 `id` 不能重复）
- [ ] 补上 `editors`
- [ ] `draft: false`

### 4. 发布

推到 `main` 就自动构建部署。

---

## 维护模型时间线

模型时间线（站点上的 `/models`）的数据在 `data/models.json`，和周报解耦 —— 「某个模型什么时候发的」可以被单独查询和引用。

```bash
npm run harvest                                  # 最近 90 天，likes >= 200
npm run harvest -- --days=365 --min-likes=500    # 拉长窗口、提高门槛
npm run harvest -- --merge                       # 核对后直接并进 data/models.json
```

两条线，**都不调用大模型**：

- **开放权重** —— Hugging Face API。作者、创建时间、下载量、许可、模态全部来自官方元数据，可核实。脚本会自动跳过 GGUF / AWQ / FP8 这类量化和格式变体 —— 它们是同一个模型的再打包，放进时间线只会把真正的发布淹掉。
- **闭源模型（有 RSS 的）** —— OpenAI / DeepMind / Mistral / Qwen 的官方博客。判定发布看的是**模型名在标题里的位置**，不是关键词黑名单：真发布把模型名放最前（`GPT-5.6: …`、`Introducing Claude Opus 5`），客户故事放句中（`Model ML completes … with GPT-5.6 Sol`）。纯黑名单会误杀 —— GPT-5.6 的发布标题里就有 "scales" 一词。
- **闭源模型（没 RSS 的）** —— Anthropic 和字节跳动 Seed 走 `sitemap.xml`（两家 robots.txt 都是 `Allow: /`）。⚠️ **不能用 sitemap 的 `lastmod` 当发布日**，那是最后修改时间 —— Anthropic 有四个模型页的 lastmod 全是同一天，那是一次站点重渲染。必须回页面里取标注的日期。要加新厂商，往 `SITEMAP_VENDORS` 里加一条配置即可。

默认只写 `.cache/harvested-models.json` 供人工核对。**发布前需要编辑 `note` 字段**：将自动整理的元数据写成简洁说明，保留有依据的变化与用途。不要用下载量推断用户身份或使用效果；涉及部署条件时，需要说明配置和来源。

### 补硬规格与「更新详情」

```bash
npm run enrich                 # 只补还没有 specs 的条目
npm run enrich -- --refresh    # 全部重拉（下载量会变）
```

从 Hugging Face API 和模型自己的 `config.json` 抓：参数总量、权重体积、上下文长度、MoE 专家配置、架构、精度、许可、语言、配套论文。全部可核实，**不调用大模型**。

时间线上每条会多出一个可展开的「规格与变化」。给条目加 `prev`（上一代同系列模型的 id）之后，差异是**自动算出来的**，不需要人工写：

```json
{ "id": "hy4-preview", "prev": "hy3", ... }
```

> 渲染成：参数量 298.8B → 780.0B（2.6 倍）、上下文 256K → 1M（4 倍）、权重体积 598 GB → 1.56 TB、MoE 专家数 192 → 256

三条设计上的注意：

- **精度变化会一并显示。** 否则「权重体积减半」会被读成「模型变小了」。真实案例：GLM-5.2 → 5.3 参数量没变，只是精度从 BF16 换成 FP8。
- **闭源模型（Claude / GPT / Gemini）没有公开权重**，硬指标一律留空，只显示版本沿革和间隔天数，并注明以官方公告为准。不要为了让表格好看去猜。
- **`prev` 只连同一条产品线。** 跨线对比（比如拿 MiniCPM-V 视觉线去比 MiniCPM5 文本线）会得出误导性的结论。
- 想手写补充数字表达不了的东西，用 `changes` 字段（字符串数组）。

### 链接体检

这份周报的可信度几乎全押在「每条都有原始来源」上，死链等于自毁招牌。

```bash
npm run check-links                  # 查 models.json + 所有期的正文链接
npm run check-links -- --only=models
```

建议每月跑一次。失效的链接要么换地址，要么在正文里标注「原链接已失效」，不要静默删掉。

---

## 换大模型厂商

成稿脚本不绑定任何一家。复制 `.env.example` 成 `.env`，改两行就能换：

```bash
LLM_PROVIDER=deepseek
LLM_MODEL=deepseek-chat
DEEPSEEK_API_KEY=sk-...
```

| `LLM_PROVIDER` | 走的协议 | key 环境变量 |
| --- | --- | --- |
| `anthropic` | 官方 SDK（自适应思考 + 拒绝回退） | `ANTHROPIC_API_KEY` |
| `openai` | OpenAI 兼容 | `OPENAI_API_KEY` |
| `deepseek` | OpenAI 兼容 | `DEEPSEEK_API_KEY` |
| `moonshot` | OpenAI 兼容 | `MOONSHOT_API_KEY` |
| `zhipu` | OpenAI 兼容 | `ZHIPU_API_KEY` |
| `qwen` | OpenAI 兼容（DashScope） | `DASHSCOPE_API_KEY` |
| `siliconflow` | OpenAI 兼容 | `SILICONFLOW_API_KEY` |
| `openrouter` | OpenAI 兼容 | `OPENROUTER_API_KEY` |
| `gemini` | Google 原生 REST | `GEMINI_API_KEY` |
| `ollama` | OpenAI 兼容（本地，免费） | 不需要 |
| `custom` | 任意 OpenAI 兼容端点 | `LLM_API_KEY` + `LLM_BASE_URL` |

### 先查真实的模型 ID

**API 上的模型 ID 和 Hugging Face 上的仓库名经常对不上**，猜一个填进去换来的通常是 404 或空响应。直接问端点：

```bash
npm run models                      # 列出当前 provider 下所有可用模型
npm run models -- --filter=kimi     # 按关键词过滤
npm run models -- --provider=deepseek
```

> `scripts/lib/llm.mjs` 里每个 preset 的 `defaultModel` 只是兜底值，模型名换代很快。注意 `LLM_MODEL` 留空**不会报错**，而是静默回落到 `defaultModel` —— 成稿时终端会打印实际用的模型，留意那一行。

### 用推理模型要注意

Kimi K3、DeepSeek-R1 这类推理模型会先「想」很久再写正文，实测 186 条候选（约 4.5 万 token 输入）要想好几分钟。三件事：

- **进度是可见的。** 终端会显示 `推理中… N 字符`，不是卡死。
- **推理内容不进最终稿，但一样计费。** 跑完会单独报告推理字符数。
- **`max_tokens` 要给够。** 推理和正文共享这个额度，给小了会出现「只有推理没有正文」——脚本会明确这样报错，而不是给你一个空文件。

嫌慢或想省钱，用 `--max-items` 裁剪输入（候选已按重要性排好序，截掉的是最不重要的那批）：

```bash
npm run draft -- --max-items=80
```

一次采集的提示词约 4.5 万 token，主流厂商的上下文都装得下。想更省，可以调小 `sources.json` 里各源的 `maxItems`。

不想花钱：`LLM_PROVIDER=ollama` 本地跑，或者干脆跳过 `draft`，用 `npm run new` 生成空模板自己写。

---

## 部署到 GitHub Pages

1. 建仓库并推上去（这个目录可以单独作为一个仓库）：

   ```bash
   git init && git add -A && git commit -m "init"
   gh repo create ai-weekly --public --source=. --push
   ```

2. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**。

3. 推到 `main` 即自动部署。`base` 和 `site` 由工作流里的 `actions/configure-pages` 自动算出来，绑定自定义域名后也会自动跟着变，代码不用改。

4. 把 `src/consts.ts` 里的 `SITE.repo` 改成你的仓库地址。

### 让每周草稿自动生成（可选）

在仓库 **Settings → Secrets and variables → Actions** 里配置：

- Variables：`LLM_PROVIDER`、`LLM_MODEL`
- Secrets：`LLM_API_KEY`

每周一北京时间早 9 点会运行采集、生成草稿并尝试开一个 PR。上述配置是可选的：未配置密钥时生成来源候选稿。工作流总限时 30 分钟，采集与成稿各限时 12 分钟。

候选 JSON 和草稿会先保存到本次 Actions 运行的 `weekly-draft-<运行编号>` 附件。若仓库不允许 Actions 创建拉取请求，PR 步骤会明确报错，仍可从附件取稿，不会丢掉已采集的内容。`draft: true` 的文件不会出现在线上，发布前仍需按上述清单编辑和核查。

本周文件已存在时，自动任务会保留原稿，跳过成稿与 PR，继续采集并保存候选附件；重复运行不会覆盖已发布内容或正在编辑的稿件。

维护自动化后可运行以下回归检查，不需要 API 密钥，也不会调用模型：

```bash
node --test scripts/lib/weekly-pipeline.test.mjs scripts/concept-links.test.mjs
```

---

## 内容规范

正文使用「本期速览」「本周重点」「其他动态」「本期未覆盖」组织内容。重要条目根据内容说明以下信息：

1. **发生了什么** —— 事实，附原始来源链接
2. **为什么重要** —— 相对之前变了什么
3. **核查状态** —— 查阅了哪些来源、何时核对、哪些信息尚未确认
4. **实测状态** —— 模型、版本、日期、任务、工具环境和结果；没试就写「未实测」
5. **使用观察** —— 与学习、工作或日常场景的具体联系；设想需标明待验证，不适用时可以省略
6. **限制与待核实信息** —— 已知限制、失败情况与仍需核实的问题

写作约定：

- **语气平实。** 面向对 AI 感兴趣的读者，允许具体的个人观察，不为每条新闻强行添加学生视角。
- **结论与证据一致。** 区分官方声明、第三方测试与编辑观察，不把少数案例扩大为普遍结论，不用下载量猜测用户身份。输入摘要未提供的信息，不等于完整原文没有说明。
- **核查与实测分开。** 查阅公告不能写成实测；已有测试需保留具体记录。整期均未实测时，在正文开头统一说明。
- **对比测试保留条件和输出。** 使用相同任务与提示词，记录模型、版本、日期、工具环境及尝试次数。客观要求可以核验；解释方式、审美等主观差异以作品展示和描述为主，不强制打分。
- **编辑提示留在草稿。** RSS 截断、脚本抓取和后续操作写在编辑记录中。面向读者时说明具体未核实项，例如样本量或测试方法。
- **事实更正保留记录。** 已发布文章若修改了事实或结论，注明更正内容与日期；纯措辞调整无需逐句标注。

新增一期：

```bash
npm run new           # 生成空模板，不调 API
```

---

## 维护概念指南

`src/content/concepts/` 中每个 Markdown 文件对应一个 `/concepts/<文件名>` 解释页。概念指南可按中英文名、别名、分类和一句话解释搜索。

```yaml
title: 词元
english: Token
aliases: [token, tokens, 词元]
category: 模型与使用
summary: 模型处理文本时使用的小片段，不能直接换算成固定字数。
updated: 2026-09-10
sources:
  - title: Hugging Face 分词文档
    url: https://huggingface.co/docs/transformers/main/tokenizer_summary
related: [context-window, moe]
```

分类使用「基础概念」「模型与使用」「评测与指标」之一。正文先解释含义，再给具体例子与容易混淆的地方；基准类词条写清所测任务、版本和分数局限。添加内容前核对原始来源，修订时更新日期；不把当前榜单成绩当作概念定义。

在周报正文中，用 `[token](concept:token)` 标注首次需要解释的术语。构建时会检查词条是否存在，并生成适配部署子路径的链接；不要在直接引语、来源链接或代码块中改写文字。概念页会列出引用它的已发布周报，`related` 字段用于连接其他概念。

校验：`node --test scripts/concept-links.test.mjs`、`npm run check`、`npm run build`。

补词条时先扫描周报正文和模型说明中的术语：相近概念可以合并在一页，例如 BF16、FP8、INT4 和 GGUF 在“数值精度与量化”中分别解释。把缩写、常见写法加入 `aliases`，让读者能按原文用词搜索；只有正文实际解释的名称才加入别名。涉及评测时区分题集版本、工具与评分条件，给出核对过的一手来源。

Astro 组件中的术语可用 `<ConceptLink id="parameters">参数量</ConceptLink>`，组件位于 `src/components/ConceptLink.astro`，会在构建时核对目标并补齐部署子路径。模型规格的对应关系集中在 `ModelDetail.astro` 的 `specConcepts` 中；不要把来源链接或模型名称自动替换为术语链接。

---

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 预览构建产物 |
| `npm run check` | 类型检查 |
| `npm run collect` | 采集候选条目 |
| `npm run draft` | 生成周报草稿 |
| `npm run weekly` | 采集 + 成稿 |
| `npm run new` | 生成空的一期模板 |
| `npm run harvest` | 抓模型发布，补充时间线 |
| `npm run check-links` | 体检所有外链 |
| `npm run enrich` | 补模型硬规格 |
| `npm run models` | 列出当前 provider 可用的模型 ID |

---

## 授权

文章内容 CC BY 4.0，代码 MIT。
