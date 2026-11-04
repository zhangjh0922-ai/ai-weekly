# Editorial Home Implementation Plan

> **For agentic workers:** Use subagent-driven-development for the independent page work; review requirements and code before integration.

**Goal:** 将已确认的第三版设计落实到现有 Astro 站点，并发布首页和功能实录。

**Architecture:** 保留 BaseLayout 的 SEO 和旧页面样式，增加 editorial 外观选项。首页从最新 issue 读取编辑字段；功能页从静态、可核查的数据读取样片说明和模型入口。视频组件复用同一组轻量本地资源，无新增前端框架。

**Tech Stack:** Astro 7、TypeScript、CSS、原生 HTML video。

## Task 1 — 页面基础与内容字段（主代理）

- [x] `src/layouts/BaseLayout.astro` 增加 `editorial?: boolean`、`edition?: { issue: number; date: Date }`；在 html 和页头按该属性使用新外观，保留全部 SEO 标签。
- [x] 新建 `src/styles/editorial.css`，限定在 `.editorial-site` 下，定义纸色、导航、品牌和 1160px 容器，不覆盖旧正文。
- [x] `src/consts.ts` 增加 `{ href: '/capabilities', label: '功能与实录' }`。
- [x] `src/content.config.ts` 扩展可选字段：

```ts
homeSummary: z.string().optional(),
homeBriefs: z.array(z.object({
  title: z.string(), summary: z.string(), date: z.string(),
  category: z.string(), url: z.url(),
})).max(3).default([]),
featuredModels: z.array(z.string()).max(3).default([]),
```

- [x] `2026-w45.md` 添加草图所用三条短讯与精选型号；其他正文保持原样。

## Task 2 — 首页（首页代理）

- [x] 改写 `src/pages/index.astro`：使用 `<BaseLayout wide editorial edition={latest?.data}>`；移除 `render(latest)`，展示主稿、录屏、短讯、型号与概念。
- [x] 引入共享 `RecordingPlayer`，接口为 `id: string; showFullToggle?: boolean`，根代理实现；所有站内 href 使用 `link()`。
- [x] 将 CSS 放在页面 scoped style 或单独 `src/styles/home.css`；复刻草图，避免绑定固定期号。
- [x] 缺少 homeBriefs 时使用最新一期 highlights；精选型号缺省使用最新模型。

## Task 3 — 功能与实录（功能页代理）

- [x] 创建 `src/data/capabilities.ts`，存储录制日期、说明、三条有出处的模型入口；不从时间线标签猜测支持关系。
- [x] 创建 `src/pages/capabilities.astro`；复用 `RecordingPlayer`；默认网页操作，`#computer` 直接打开电脑操作。
- [x] 正确实现 tablist/tab/tabpanel、roving tabindex、方向键/Home/End、hashchange，切换分区时暂停视频。
- [x] 模型表格使用局部滚动容器；说明文案与来源沿用批准草图。

## Task 4 — 媒体与维护文档（主代理）

- [x] 创建 `src/components/RecordingPlayer.astro`，媒体统一位于 `/media/browser-lookup-2026-11-02/`，通过 `link()` 处理 base。
- [x] 拷贝已录制的 excerpt.mp4、full.mp4、poster.jpg；提供文字操作记录与可下载完整片段。
- [x] 文档说明样片来源、剪辑方式与未来更新方式；README 记录首页 frontmatter 字段。

## Task 5 — 验证与发布（主代理与只读审查代理）

- [x] 运行 `npm run check`，无错误；运行 `npm run build` 检查静态路由。
- [x] 用 `SITE_URL=https://emergenceailab.com` 构建主站；以 `BASE_PATH=/ai-weekly/` 另建镜像版本，检查新页面与媒体链接带前缀。
- [x] 浏览器验证桌面、390px 手机、视频两版本、键盘分区切换与历史/深链。
- [x] 独立审查先看设计要求覆盖，再看回归和代码质量；修复有效问题。
- [x] 合并 main 并推送；检查 GitHub workflow、主站与功能页部署、视频资源可访问。保存最终截图。

这是展示与内容结构改动，使用类型检查、构建及真实浏览器交互验证，不添加仅复制实现的单元测试。
## 验证记录（2026-11-04）

- 实现提交：d80fa9d7873ffc8619a31875f364cb23c6b4051c。
- Astro check：22 个文件，0 errors / warnings / hints；根路径与 GitHub 子路径均构建 77 页成功。
- 两种构建各检查 69 个站内链接及媒体引用，目标均存在。
- 浏览器验证：桌面与 390px 手机布局、旧周报阅读、分区深链/键盘/返回、隐藏视频暂停；阻断初始视频时正确显示失败提示与下载入口，随后已恢复网络设置和默认视口。
- GitHub Pages 工作流 41764163902 的 build、deploy 成功。
- emergenceailab.com 首页与 /capabilities 已显示新版；线上完整片段读取到 63.833 秒并播放，节选读取到 7 秒并播放完成。两文件均返回 HTTP 200、video/mp4，支持 Range。
- 线上截图保存在本地 output/design-preview/live-home-2026-11-04.png（不进入仓库）。