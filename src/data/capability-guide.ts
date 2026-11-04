import type { CapabilityId } from './capability-types';

export interface CapabilityGuide {
  id: CapabilityId;
  label: string;
  title: string;
  english: string;
  summary: string;
  steps: [string, string, string];
  example: string;
  boundary: string;
  concept: string;
}

export const capabilityGuides: CapabilityGuide[] = [
  { id: 'text', label: '文字推理', title: '理解问题，组织回答', english: 'Language & reasoning',
    summary: '聊天、解释概念、写作和分析情境，共享语言理解与推理能力；区别在于任务要求。',
    steps: ['接收问题与背景', '结合上下文组织内容', '输出解释、判断或文字'],
    example: '解释置信区间，再用一个生活例子检验你有没有理解；也可以分析一段存在信息冲突的情境描述。',
    boundary: '说得流畅不等于事实正确。解释顺序和表达风格可以对照原文看，事实与逻辑则需要另行核验。', concept: 'reasoning-chain' },
  { id: 'vision', label: '图片理解', title: '读懂图片里的信息', english: 'Image understanding',
    summary: '把图片作为输入，识别文字、图表、物体及空间关系，结合问题进行分析。',
    steps: ['上传图片或页面截图', '提取视觉与文字信息', '结合问题回答'],
    example: '读取实验图表中的变化趋势，或找出手写解题过程在哪一步出现了错误。',
    boundary: '能看图不等于能生图；小字、密集图表和精确坐标也可能识别错误。', concept: 'multimodal' },
  { id: 'search', label: '联网检索', title: '找资料，并追溯来源', english: 'Web search & retrieval',
    summary: '借助搜索与网页读取工具获取外部资料，再筛选、核对并整理答案。',
    steps: ['提出检索词', '搜索并读取资料', '综合答案与来源'],
    example: '查找某项产品更新的发布日期，核对官方日志与适用范围，再整理成一段带出处的说明。',
    boundary: '搜索或抓取网页不等于能点击、填表；带链接的回答也可能引用不当，需要核对原文。', concept: 'rag' },
  { id: 'code', label: '编程', title: '从代码到可运行的作品', english: 'Coding',
    summary: '生成和修改代码是模型能力；运行程序、安装依赖和验证结果还需要开发环境。',
    steps: ['描述需求或提供代码', '生成代码与修改', '在环境中运行并检查'],
    example: '给不同模型同一份网页需求，保留成品，对照功能完成度、设计风格和实际交互。',
    boundary: '表中“原生”只确认代码生成能力，不承诺自动部署、可用率或设计质量。', concept: 'harness' },
  { id: 'files', label: '文件处理', title: '读文件，也把成果交成文件', english: 'Document & file workflows',
    summary: '读取、分析、修改和导出是不同环节；具体能走到哪一步，取决于文件格式和工具入口。',
    steps: ['上传并解析文件', '整理内容或计算数据', '按入口能力导出成果'],
    example: '把几份学习资料整理成一份有结构的 Word 文档，检查标题层级、表格、引用与实际排版。',
    boundary: '看懂 PDF 不代表会生成 Word。单元格会分别说明读取、编辑、生成或导出的已确认范围。', concept: 'tool-use' },
  { id: 'image', label: '图片生成', title: '把描述变成图片', english: 'Image generation & editing',
    summary: '根据文字、参考图或编辑指令生成图片。专用生图模型与聊天产品里的生图入口需要分开看。',
    steps: ['输入描述与参考图', '模型生成或修改图像', '检查成品并迭代'],
    example: '用同一个海报提示词比较构图、配色、文字呈现与指令遵循，保留原图供读者自己判断风格。',
    boundary: '支持生图不表示同时支持参考图、局部编辑或一致角色；这些要看具体型号和入口。', concept: 'diffusion' },
  { id: 'audio-in', label: '语音输入', title: '把声音变成可理解的信息', english: 'Speech recognition & audio input',
    summary: '转写、说话人识别、声音理解和语音问答各有范围，不能只用一个“支持音频”概括。',
    steps: ['输入录音或实时音频', '转写或理解声音', '输出文本或后续回答'],
    example: '把讨论录音转成带时间戳的文字，核对专业术语，再整理待办事项。',
    boundary: '只做转写的模型不会自动生成会议总结；嘈杂环境、多人重叠说话也可能影响结果。', concept: 'multimodal' },
  { id: 'audio-out', label: '语音输出', title: '让文字或对话发出声音', english: 'Speech generation',
    summary: '文字转语音负责把内容读出来；实时语音对话还涉及听取输入、轮次衔接和打断。',
    steps: ['提供文字或对话', '生成音频或连续音频流', '播放并检查发音'],
    example: '做英语口语练习，或把文章转成可收听的音频，对比发音、停顿、语气和打断体验。',
    boundary: '支持语音输出不等于具备实时听说，也不自动包含音乐生成。', concept: 'multimodal' },
  { id: 'video', label: '视频生成', title: '生成随时间变化的画面', english: 'Video generation',
    summary: '根据文字、图片或参考片段生成视频，关注动作、镜头与前后画面的一致性。',
    steps: ['描述场景与镜头', '生成连续视频片段', '检查动作和一致性'],
    example: '把同一张参考图变成一段短片，比较主体是否稳定、动作是否合理、是否遵循镜头要求。',
    boundary: '这里的“视频生成”不包括观看视频并回答问题；带音轨、片长和分辨率也取决于具体版本。', concept: 'multimodal' },
  { id: 'tools', label: '工具调用', title: '把决定交给外部工具执行', english: 'Tool / function calling',
    summary: '模型提出结构化的工具名和参数，应用负责执行，并把结果交回模型继续处理。',
    steps: ['模型选择工具与参数', '应用检查并执行调用', '结果回传给模型'],
    example: '计算表格数据、读取日历或查询数据库，再根据结果继续回答或完成下一步。',
    boundary: '能调用函数不代表已经接入所有工具。MCP 是一种连接协议，也不等同于模型本身的能力。', concept: 'tool-use' },
  { id: 'browser', label: '网页操作', title: '在网页里查找、点击和填写', english: 'Browser use',
    summary: '借助浏览器工具读页面结构或截图，选择控件，执行操作，再查看网页是否发生预期变化。',
    steps: ['读取网页结构或截图', '点击、填写、翻页', '观察结果并继续'],
    example: '在模型时间线里搜索 Kimi、展开详情、找到使用条件。下方保留了实际操作录屏。',
    boundary: '读结构和只看截图的难度不同。能搜索网页不能直接证明会操作网页，网站权限也会影响可完成的任务。', concept: 'browser-automation' },
  { id: 'computer', label: '电脑操作', title: '在应用界面之间完成任务', english: 'Computer use',
    summary: '通常以截图观察界面，生成鼠标和键盘动作；执行器操作电脑，再把新画面交给模型。',
    steps: ['观察屏幕截图', '执行点击与键盘动作', '检查界面并调整'],
    example: '把网页里的资料整理进文档，再检查文件保存位置。需要模型、操作工具和已授权的应用环境一起配合。',
    boundary: '电脑操作可能只在 API 或特定产品里开放。“接工具”不代表普通聊天窗口就能控制你的电脑。', concept: 'computer-use' },
];

export const capabilityGroups: { id: string; label: string; ids: CapabilityId[] }[] = [
  { id: 'all', label: '全部能力', ids: capabilityGuides.map((item) => item.id) },
  { id: 'work', label: '学习与工作', ids: ['text', 'vision', 'search', 'code', 'files', 'tools'] },
  { id: 'media', label: '图像与音视频', ids: ['vision', 'image', 'audio-in', 'audio-out', 'video'] },
  { id: 'action', label: 'Agent 与操作', ids: ['search', 'code', 'files', 'tools', 'browser', 'computer'] },
];

export const statusLabels = { native: '原生', tool: '接工具', product: '产品内', unsupported: '不支持' } as const;
