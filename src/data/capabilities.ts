export interface RecordingFact {
  label: string;
  value: string;
}

export interface RecordingExplanation {
  title: string;
  text: string;
}

export interface BrowserRecording {
  recordedAt: string;
  title: [string, string];
  description: string;
  facts: RecordingFact[];
  explanations: RecordingExplanation[];
  notes: string[];
}

export interface ComputerUseExample {
  model: string;
  organization: string;
  entryPoints: string[];
  conditions: string;
  source: {
    label: string;
    url: string;
  };
}

export const browserRecording: BrowserRecording = {
  recordedAt: '2026-11-02',
  title: ['在本站记录里，', '找到 Kimi 的开放条件'],
  description:
    '搜索 Kimi K3.1 Pro、展开条目，再阅读 Kimi Code 的使用条件。这是一段 Codex 会话操作本站的真实样片。',
  facts: [
    { label: '执行入口', value: '录制时的 Codex 会话' },
    { label: '操作方式', value: '读取网页结构，定位控件并操作' },
    { label: '底层型号', value: '本样片未单独核定' },
    { label: '展示范围', value: '网页查找与阅读；未测试桌面跨应用' },
  ],
  explanations: [
    {
      title: '找到的答案',
      text: '本站 2026 年 11 月 2 日记录：Kimi Code 的 Pro 模型需 Plus／Moderato 及以上；最高 1M 上下文需 Pro／Allegretto 及以上。这次未重新核验厂商套餐。',
    },
    {
      title: '它是怎样运行的',
      text: '工具提供页面信息 → AI 选择控件 → 工具执行搜索或点击 → AI 读取更新后的页面。',
    },
  ],
  notes: [
    '首次录制因工具连接中断未保存，当前视频为重新录制。约 7 秒节选压缩了静止等待，约 64 秒完整片段保留录制时间轴；它们都不能用于不同模型的速度或成功率排名。',
    '这里使用网页结构定位控件，提供的信息不同于仅依据截图的 Computer use。视频展示查找本站记录的过程，没有重新核验厂商最新套餐，也没有单独核定底层模型型号。',
  ],
};

export const computerUse = {
  checkedAt: '2026-11-02',
  introduction: [
    'Computer use 通常让模型观察截图，提出点击、输入等动作；执行工具操作电脑，再把新画面交回模型。',
    '能否完成一项电脑任务，既取决于模型，也取决于工具、环境和权限。',
  ],
  scopeNote:
    '以上是已核查的三个例子，并非完整名单。模型支持某项工具，并不表示每个聊天入口都提供它。',
};

export const computerUseExamples: ComputerUseExample[] = [
  {
    model: 'GPT-6.1 Terra',
    organization: 'OpenAI',
    entryPoints: ['ChatGPT Work', 'Codex / API'],
    conditions: '发布页介绍电脑任务能力，但没有说明实际执行器；API 运行环境需另查接入文档。',
    source: {
      label: '发布页',
      url: 'https://openai.com/index/introducing-gpt-6-1-terra/',
    },
  },
  {
    model: 'Gemini 3.8 Flash',
    organization: 'Google',
    entryPoints: ['Gemini API'],
    conditions:
      '模型返回操作指令，需自建客户端执行器并回传截图；可接入浏览器、移动端或桌面环境。',
    source: {
      label: '工具文档',
      url: 'https://ai.google.dev/gemini-api/docs/computer-use',
    },
  },
  {
    model: 'Claude Opus 5.5',
    organization: 'Anthropic',
    entryPoints: ['Claude API'],
    conditions:
      '需自建动作执行器，由应用执行工具调用并回传结果。参考实现使用 Docker 中的 Linux 桌面。',
    source: {
      label: '工具文档',
      url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool',
    },
  },
];
