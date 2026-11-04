import type { CapabilityEvidence, CapabilityModel, CapabilityStatus } from './capability-types';

const sources = {
  sunburst: {
    url: 'https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst',
    label: 'OpenAI 模型卡',
  },
  qwenImage: {
    url: 'https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo',
    label: 'Qwen 官方模型卡',
  },
  nanoBanana: {
    url: 'https://aistudio.google.com/docs/models/gemini-nano-banana-2.1',
    label: 'Google 模型规格',
  },
  kling: {
    url: 'https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling',
    label: '可灵 4.0 官方公告',
  },
  seedance: {
    url: 'https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5',
    label: 'Seedance 2.5 官方公告',
  },
  qwenAudio: {
    url: 'https://docs.qwencloud.com/changelog/models',
    label: 'QwenCloud 模型发布日志',
  },
  qwenRealtime: {
    url: 'https://docs.qwencloud.com/developer-guides/speech/qwen-audio-realtime',
    label: 'Qwen 实时语音接入指南',
  },
  voxtralTranscribe: {
    url: 'https://docs.mistral.ai/studio/audio/speech-to-text/overview',
    label: 'Mistral 语音转写指南',
  },
  voxtralTts: {
    url: 'https://docs.mistral.ai/studio/audio/text-to-speech/overview',
    label: 'Mistral 语音合成指南',
  },
} as const;

function evidence(
  source: keyof typeof sources,
  status: CapabilityStatus,
  detail: string,
): CapabilityEvidence {
  return {
    status,
    detail,
    source: sources[source].url,
    sourceLabel: sources[source].label,
    checkedAt: '2026-11-04',
  };
}

// Reference media are described in notes, not counted as general understanding.
// Missing cells remain unverified; specialization alone does not prove absence.
export const specialistModels: CapabilityModel[] = [
  {
    id: 'gpt-image-2-5-sunburst',
    name: 'GPT Image 2.5 Sunburst',
    org: 'OpenAI',
    kind: 'specialist',
    entry: 'Image API / Responses 图像生成工具',
    note: '图像生成与编辑模型，接收文字和图片，输出图片；在其他模型的工具链中被调用，不等于自己会调用工具。',
    capabilities: {
      text: evidence('sunburst', 'unsupported', '规格明确文字仅用于输入，模型不输出文字。'),
      image: evidence('sunburst', 'native', '原生生成和编辑图片；可直接调用 Image API，也可作为 Responses 的图像工具。'),
      'audio-in': evidence('sunburst', 'unsupported', '模型卡明确不支持音频模态。'),
      'audio-out': evidence('sunburst', 'unsupported', '模型卡明确不支持音频模态，输出为图片。'),
      video: evidence('sunburst', 'unsupported', '模型卡明确不支持视频模态。'),
      tools: evidence('sunburst', 'unsupported', '模型卡明确不支持函数调用。'),
    },
  },
  {
    id: 'qwen-image-2-1-turbo',
    name: 'Qwen-Image-2.1-Turbo',
    org: 'Qwen',
    kind: 'specialist',
    entry: '官方权重 / Diffusers',
    note: '统一生图和编辑的加速型号，使用推荐的 8 步采样方案；权重采用 Qwen Research License。',
    capabilities: {
      image: evidence('qwenImage', 'native', '8 步文生图与图像编辑，模型卡展示透明图片和多参考图合成用途。'),
    },
  },
  {
    id: 'gemini-nano-banana-2-1',
    name: 'Gemini Nano Banana 2.1',
    org: 'Google DeepMind',
    kind: 'specialist',
    entry: 'Gemini API / Google AI Studio',
    note: '图像生成与对话式编辑；输入可含文字、图片、视频及 PDF，输出为图片和文字。视频输入不能视为视频生成。',
    capabilities: {
      search: evidence('nanoBanana', 'tool', '可借助 Google 网页和图片搜索，为图像生成提供依据。'),
      files: evidence('nanoBanana', 'native', '模型规格明确接受 PDF 输入；不能据此视为具备文件搜索或导出办公文档能力。'),
      image: evidence('nanoBanana', 'native', '原生图像生成与多轮编辑，支持 1K / 2K / 4K 输出及最多 14 张参考图片。'),
      'audio-in': evidence('nanoBanana', 'unsupported', '完整输入模态列表为文字、图片、视频和 PDF，不含音频输入。'),
      'audio-out': evidence('nanoBanana', 'unsupported', '模型规格明确不支持音频生成。'),
      video: evidence('nanoBanana', 'unsupported', '规格只列图片和文字输出；接收视频不代表输出视频。'),
      tools: evidence('nanoBanana', 'unsupported', '模型规格明确不支持函数调用；搜索依据是单独列出的能力。'),
    },
  },
  {
    id: 'kling-4-0',
    name: 'Kling 4.0',
    org: '快手可灵',
    kind: 'specialist',
    entry: '可灵视频生成服务',
    note: '视频生成与编辑；支持图片、视频和主体参考，以及多关键帧。功能与配额按实际入口和套餐区分。',
    capabilities: {
      'audio-out': evidence('kling', 'native', '生成视频中的人物语音与对话，并与口型同步；此处不表示提供独立 TTS 接口。'),
      video: evidence('kling', 'native', '单次原生生成最长 30 秒视频，支持最多 10 个关键帧和定向视频编辑。'),
    },
  },
  {
    id: 'seedance-2-5',
    name: 'Seedance 2.5',
    org: '字节跳动 Seed',
    kind: 'specialist',
    entry: '即梦 AI / 豆包专业版视频入口',
    note: '音视频联合生成；可参考最多 30 张图片、10 段视频与 10 段音频。参考素材输入不等于通用识别或转写。',
    capabilities: {
      'audio-out': evidence('seedance', 'native', '音视频联合生成包含角色语音、对白或演唱；限定视频内声音，不视为独立语音对话服务。'),
      video: evidence('seedance', 'native', '单次生成最长 30 秒音视频，支持多轮延长及按时间戳定向编辑。'),
    },
  },
  {
    id: 'qwen-audio-3-1-realtime-flash',
    name: 'Qwen-Audio-3.1-Realtime-Flash',
    org: '阿里通义',
    kind: 'specialist',
    entry: 'QwenCloud 实时 API',
    note: '实时双工语音对话；文字与音频均可输入输出，通过 WebSocket、WebRTC 或 AOQ 接入。',
    capabilities: {
      text: evidence('qwenAudio', 'native', '语音对话型号也支持文字输入与文字回复。'),
      search: evidence('qwenRealtime', 'tool', '通过联网搜索取得最新信息及来源；联网搜索和函数调用不能同时启用。'),
      'audio-in': evidence('qwenAudio', 'native', '原生接收实时音频并进行双工语音对话。'),
      'audio-out': evidence('qwenAudio', 'native', '原生输出语音，支持实时双工交互与音色克隆。'),
      tools: evidence('qwenRealtime', 'native', '模型决定何时发起函数调用，外部应用负责执行并返回结果。'),
    },
  },
  {
    id: 'voxtral-mini-transcribe-3',
    name: 'Voxtral Mini Transcribe 3',
    org: 'Mistral AI',
    kind: 'specialist',
    entry: 'Mistral 音频转写 API（公开预览）',
    note: '离线录音转写模型。官方将录音摘要和音频问答列为另一类音频聊天模型的任务。',
    capabilities: {
      'audio-in': evidence('voxtralTranscribe', 'native', '转写录音，支持说话人区分、上下文词汇偏置与分段时间戳；不提供逐词时间戳。'),
    },
  },
  {
    id: 'voxtral-mini-tts-3',
    name: 'Voxtral Mini TTS 3',
    org: 'Mistral AI',
    kind: 'specialist',
    entry: 'Mistral 语音合成 API（公开预览）',
    note: 'API 型号 voxtral-mini-tts-3-0，官方文档名 Voxtral TTS 3。由完整文字生成语音，可流式返回音频。',
    capabilities: {
      'audio-out': evidence('voxtralTts', 'native', '文字转语音，支持预设及克隆音色、情绪和语速标签、发音控制与流式音频输出。'),
    },
  },
  {
    id: 'qwen-audio-3-1-tts-next',
    name: 'Qwen-Audio-3.1-TTS-Next',
    org: '阿里通义',
    kind: 'specialist',
    entry: 'QwenCloud 音频生成 API',
    note: '统一音频生成模型，可输入文字、时间信息和参考音频，合成语音、音效与环境声。',
    capabilities: {
      'audio-out': evidence('qwenAudio', 'native', '支持单人语音、多人对白和播客，并可将语音、音效、环境声联合生成。'),
    },
  },
];
