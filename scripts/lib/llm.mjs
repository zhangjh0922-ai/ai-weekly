/**
 * 厂商无关的大模型调用层。
 *
 * 三条路径：
 *   anthropic  —— 官方 @anthropic-ai/sdk（不要用 OpenAI 兼容层去调 Claude，
 *                 自适应思考、fallbacks 这些参数只有官方 SDK 有）
 *   openai     —— /v1/chat/completions 协议。OpenAI 自己、DeepSeek、Kimi、
 *                 智谱、通义、SiliconFlow、OpenRouter、Ollama 全都说这套协议
 *   gemini     —— Google Generative Language REST
 *
 * 切换只改 .env 里的 LLM_PROVIDER，调用方（draft.mjs）完全不用知道用的是谁。
 */
import { log } from './util.mjs';

/**
 * 推理模型（kimi-k3、deepseek-reasoner 这类）在吐出正文前会先想很久，
 * 期间可能长时间没有新数据。undici 默认 300 秒无数据就掐断连接，
 * 报一个只有 "terminated" 三个字的错 —— 所以这里显式关掉超时。
 *
 * ⚠️ fetch 和 Agent 必须来自**同一个** undici 实例。npm 装的 undici 和
 * Node 内置的是两份不同的代码，把 npm 版的 Agent 传给全局 fetch 会报
 * "invalid onRequestStart method"。所以这里成对导入，拿不到就整体退回全局 fetch。
 */
let http;
async function getHttp() {
  if (http) return http;
  try {
    const { fetch: undiciFetch, Agent } = await import('undici');
    const agent = new Agent({ headersTimeout: 0, bodyTimeout: 0, keepAliveTimeout: 60_000 });
    http = (url, init = {}) => undiciFetch(url, { ...init, dispatcher: agent });
  } catch {
    // 没装 undici 也能跑，只是超长的推理可能在 300 秒处被掐断
    http = (url, init) => fetch(url, init);
  }
  return http;
}

/**
 * 各家的接入信息。
 *
 * ⚠️ defaultModel 只是「跑得起来」的兜底值，模型名换代很快，很可能已经过期。
 * 正式使用请在 .env 里显式写 LLM_MODEL —— models 那一列是官方模型列表地址。
 */
export const PRESETS = {
  anthropic: {
    kind: 'anthropic',
    label: 'Anthropic Claude',
    keyEnv: 'ANTHROPIC_API_KEY',
    defaultModel: 'claude-opus-5',
    models: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  openai: {
    kind: 'openai',
    label: 'OpenAI',
    keyEnv: 'OPENAI_API_KEY',
    baseURL: 'https://api.openai.com/v1',
    defaultModel: 'gpt-5',
    models: 'https://platform.openai.com/docs/models',
  },
  deepseek: {
    kind: 'openai',
    label: 'DeepSeek',
    keyEnv: 'DEEPSEEK_API_KEY',
    baseURL: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    models: 'https://api-docs.deepseek.com/quick_start/pricing',
  },
  moonshot: {
    kind: 'openai',
    label: 'Moonshot / Kimi',
    keyEnv: 'MOONSHOT_API_KEY',
    baseURL: 'https://api.moonshot.cn/v1',
    defaultModel: 'kimi-latest',
    models: 'https://platform.moonshot.cn/docs/pricing',
  },
  zhipu: {
    kind: 'openai',
    label: '智谱 GLM',
    keyEnv: 'ZHIPU_API_KEY',
    baseURL: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4-plus',
    models: 'https://open.bigmodel.cn/dev/howuse/model',
  },
  qwen: {
    kind: 'openai',
    label: '阿里通义千问（DashScope 兼容模式）',
    keyEnv: 'DASHSCOPE_API_KEY',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    defaultModel: 'qwen-plus',
    models: 'https://help.aliyun.com/zh/model-studio/models',
  },
  siliconflow: {
    kind: 'openai',
    label: 'SiliconFlow 硅基流动',
    keyEnv: 'SILICONFLOW_API_KEY',
    baseURL: 'https://api.siliconflow.cn/v1',
    defaultModel: 'deepseek-ai/DeepSeek-V3',
    models: 'https://cloud.siliconflow.cn/models',
  },
  openrouter: {
    kind: 'openai',
    label: 'OpenRouter（一个 key 打通多家）',
    keyEnv: 'OPENROUTER_API_KEY',
    baseURL: 'https://openrouter.ai/api/v1',
    defaultModel: 'anthropic/claude-opus-4.5',
    models: 'https://openrouter.ai/models',
  },
  gemini: {
    kind: 'gemini',
    label: 'Google Gemini',
    keyEnv: 'GEMINI_API_KEY',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-2.5-pro',
    models: 'https://ai.google.dev/gemini-api/docs/models',
  },
  ollama: {
    kind: 'openai',
    label: '本地 Ollama',
    keyEnv: null,
    baseURL: 'http://localhost:11434/v1',
    defaultModel: 'qwen3',
    models: 'https://ollama.com/library',
  },
  custom: {
    kind: 'openai',
    label: '自定义 OpenAI 兼容端点',
    keyEnv: 'LLM_API_KEY',
    baseURL: null,
    defaultModel: null,
    models: '（自己的服务）',
  },
};

export function resolveProvider(env = process.env) {
  const name = (env.LLM_PROVIDER || 'anthropic').toLowerCase();
  const preset = PRESETS[name];

  if (!preset) {
    throw new Error(
      `未知的 LLM_PROVIDER="${name}"。可选：${Object.keys(PRESETS).join(', ')}`,
    );
  }

  const baseURL = env.LLM_BASE_URL || preset.baseURL;
  const model = env.LLM_MODEL || preset.defaultModel;
  const apiKey = env.LLM_API_KEY || (preset.keyEnv ? env[preset.keyEnv] : null);

  if (preset.keyEnv && !apiKey) {
    const error = new Error(
      `缺少 API key。在 .env 里设置 ${preset.keyEnv}=…（或用通用的 LLM_API_KEY）。\n` +
        `  当前 provider：${name}（${preset.label}）`,
    );
    error.code = 'MISSING_API_KEY';
    throw error;
  }
  if (preset.kind === 'openai' && !baseURL) {
    throw new Error(`provider="${name}" 需要显式设置 LLM_BASE_URL`);
  }
  if (!model) {
    throw new Error(
      `provider="${name}" 需要显式设置 LLM_MODEL。\n` +
        `  跑 \`npm run models\` 直接问端点要真实的模型 ID，或看 ${preset.models}`,
    );
  }

  return { name, ...preset, baseURL, model, apiKey };
}

/**
 * 统一的调用入口。
 * @returns {Promise<{text: string, usage: object, provider: string, model: string}>}
 */
export async function complete(
  provider,
  { system, prompt, maxTokens = 32000, effort = 'high', onDelta, onReasoning, retries = 3 },
) {
  const opts = { system, prompt, maxTokens, effort, onDelta, onReasoning };

  let last;
  for (let i = 0; i <= retries; i++) {
    if (i) {
      // 限流退避要给得比网络抖动更久，否则只会继续撞墙
      await new Promise((r) => setTimeout(r, 4000 * 2 ** (i - 1)));
    }
    try {
      switch (provider.kind) {
        case 'anthropic':
          return await callAnthropic(provider, opts);
        case 'openai':
          return await callOpenAICompatible(provider, opts);
        case 'gemini':
          return await callGemini(provider, opts);
        default:
          throw new Error(`不支持的 provider kind: ${provider.kind}`);
      }
    } catch (err) {
      last = err;
      if (!err.retryable) throw err; // 400、401 这类重试也没用
    }
  }
  throw last;
}

// ---------------------------------------------------------------- Anthropic

async function callAnthropic(provider, { system, prompt, maxTokens, effort, onDelta }) {
  let Anthropic;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
  } catch {
    throw new Error('用 Anthropic 需要先装 SDK：npm i -D @anthropic-ai/sdk');
  }

  const client = new Anthropic({ apiKey: provider.apiKey });

  // 走 beta 端点是为了拿 fallbacks —— 安全分类器偶尔会拒绝请求，
  // fallbacks:"default" 会在同一次调用里自动换一个模型重跑，而不是把拒绝丢回来。
  const stream = client.beta.messages.stream({
    model: provider.model,
    max_tokens: maxTokens,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort },
    system,
    messages: [{ role: 'user', content: prompt }],
  });

  if (onDelta) stream.on('text', onDelta);

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new Error(
      `模型拒绝了这次请求（category: ${message.stop_details?.category ?? '未知'}）。` +
        `\n  ${message.stop_details?.explanation ?? ''}`,
    );
  }

  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');

  return {
    text,
    usage: message.usage,
    provider: provider.name,
    model: message.model ?? provider.model,
  };
}

// ------------------------------------------------- OpenAI 兼容（大多数厂商）

async function callOpenAICompatible(provider, { system, prompt, maxTokens, onDelta, onReasoning }) {
  const url = `${provider.baseURL.replace(/\/$/, '')}/chat/completions`;

  const headers = {
    'Content-Type': 'application/json',
    ...(provider.apiKey ? { Authorization: `Bearer ${provider.apiKey}` } : {}),
    // OpenRouter 要求带来源标识，其他家会忽略
    ...(provider.name === 'openrouter'
      ? { 'HTTP-Referer': 'https://github.com/your-name/ai-weekly', 'X-Title': 'AI Weekly' }
      : {}),
  };

  const httpFetch = await getHttp();

  const res = await httpFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: provider.model,
      max_tokens: maxTokens,
      stream: true,
      stream_options: { include_usage: true },
      messages: [
        ...(system ? [{ role: 'system', content: system }] : []),
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`${provider.label} 返回 ${res.status}：${body.slice(0, 500)}`);
    // 限流和服务端错误是暂时的，标记出来让上层退避重试
    err.retryable = res.status === 429 || res.status >= 500;
    err.status = res.status;
    throw err;
  }

  let text = '';
  let usage = null;
  let reasoningChars = 0;
  let finishReason = null;

  for await (const data of sseLines(res)) {
    if (data === '[DONE]') break;
    let chunk;
    try {
      chunk = JSON.parse(data);
    } catch {
      continue; // 有些网关会插心跳行
    }

    if (chunk.usage) usage = chunk.usage;

    // finish_reason === "length" 表示被输出上限截断。
    // 各家的实际上限未必等于你传的 max_tokens（实测 Moonshot 封顶 16384，
    // 传 32000 会被静默忽略），所以必须靠这个字段发现，而不是靠算术。
    if (chunk.choices?.[0]?.finish_reason) finishReason = chunk.choices[0].finish_reason;

    const delta = chunk.choices?.[0]?.delta;
    if (!delta) continue;

    // 推理模型（kimi-k3、deepseek-reasoner…）先吐 reasoning_content 再吐正文。
    // 正文不进最终稿，但必须给出进度，否则几分钟的静默看起来就是卡死。
    const thinking = delta.reasoning_content ?? delta.reasoning;
    if (thinking) {
      reasoningChars += thinking.length;
      onReasoning?.(thinking, reasoningChars);
    }

    if (delta.content) {
      text += delta.content;
      onDelta?.(delta.content);
    }
  }

  if (!text.trim()) {
    throw new Error(
      reasoningChars > 0
        ? `${provider.label} 只输出了推理内容（${reasoningChars} 字符）就没了正文 —— ` +
          `max_tokens=${maxTokens} 可能被推理阶段吃光了，调大再试`
        : `${provider.label} 返回了空内容 —— 检查 LLM_MODEL="${provider.model}" 是否存在`,
    );
  }

  return {
    text,
    usage,
    provider: provider.name,
    model: provider.model,
    reasoningChars,
    finishReason,
    truncated: finishReason === 'length',
  };
}

// ------------------------------------------------------------------ Gemini

async function callGemini(provider, { system, prompt, maxTokens, onDelta }) {
  const url =
    `${provider.baseURL.replace(/\/$/, '')}/models/${provider.model}:streamGenerateContent` +
    `?alt=sse&key=${encodeURIComponent(provider.apiKey)}`;

  const httpFetch = await getHttp();

  const res = await httpFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Gemini 返回 ${res.status}：${body.slice(0, 500)}`);
  }

  let text = '';
  let usage = null;

  for await (const data of sseLines(res)) {
    let chunk;
    try {
      chunk = JSON.parse(data);
    } catch {
      continue;
    }
    if (chunk.usageMetadata) usage = chunk.usageMetadata;

    for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
      if (part.text) {
        text += part.text;
        onDelta?.(part.text);
      }
    }
  }

  if (!text.trim()) throw new Error('Gemini 返回了空内容');

  return { text, usage, provider: provider.name, model: provider.model };
}

// -------------------------------------------------------------------- 工具

/** 把 SSE 响应体切成一行行 data:，跨 chunk 的半行会被正确拼接 */
async function* sseLines(res) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (line.startsWith('data:')) yield line.slice(5).trim();
    }
  }

  const tail = buffer.trim();
  if (tail.startsWith('data:')) yield tail.slice(5).trim();
}

export function describeProvider(p) {
  return `${p.label} · ${p.model}${p.baseURL ? ` · ${p.baseURL}` : ''}`;
}

export function reportUsage(result) {
  const u = result.usage;
  if (!u) return;
  const inTok = u.input_tokens ?? u.prompt_tokens ?? u.promptTokenCount;
  const outTok = u.output_tokens ?? u.completion_tokens ?? u.candidatesTokenCount;
  if (inTok || outTok) log.dim(`  token：输入 ${inTok ?? '?'} / 输出 ${outTok ?? '?'}`);
}
