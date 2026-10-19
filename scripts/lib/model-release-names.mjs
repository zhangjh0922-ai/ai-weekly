const RELEASE_VERB = /\b(introducing|announcing|meet|launch(ing)?|now available|available now|we[''']re releasing|releasing|previewing)\b/i;
const MODEL_NAME = /\b(gpt|o\d|claude|gemini|gemma|llama|mistral|magistral|codestral|devstral|pixtral|qwen|qwq|deepseek|kimi|glm|grok|phi|nova|sora|veo|imagen|whisper|dall·?e)[\w.\-]*/i;

/**
 * 带版本号的模型名，例如 GPT-5.6、Gemini 3.7、Claude Opus 5、Mistral Small 4。
 *
 * 为什么需要这条：只要求「发布动词 + 模型名」会漏掉真正的发布。
 * OpenAI 发 GPT-5.6 的标题是「GPT-5.6: Frontier intelligence that scales with
 * your ambition」—— 一个发布动词都没有，直接被旧规则丢掉了。
 */
const VERSIONED_MODEL =
  /\b(gpt|claude|gemini|gemma|llama|mistral|qwen|deepseek|kimi|glm|grok|phi)[\s-]*(opus|sonnet|haiku|small|medium|large|flash|pro|max|mini|nano)?[\s-]*\d+(\.\d+)?\b/i;

// Only known model suffixes may inherit a shared prefix in "Sol and Luna".
// A general word match would swallow prose such as "GPT-6 and Intelligent UI".
const GPT_SUFFIX = 'astra|sol|luna|terra|instant|pro|mini|nano|codex|turbo|sunburst|flare';
const GPT_BASE = 'gpt(?:[\\s-]+image(?:[\\s-]+\\d+(?:\\.\\d+)*)?|[\\s-]*\\d+(?:\\.\\d+)*[a-z]?)';
const GPT_MODEL = `\\b${GPT_BASE}(?:[\\s-]+(?:${GPT_SUFFIX}))?\\b`;
const MODEL = new RegExp(
  [`\\bChatGPT\\s+Images\\s+\\d+(?:\\.\\d+)*\\b`, GPT_MODEL, VERSIONED_MODEL.source, MODEL_NAME.source].join('|'),
  'i',
);
const MODEL_AT_START = new RegExp(`^(?:${MODEL.source})`, 'i');
const QUALIFIED_GPT = new RegExp(`^(${GPT_BASE})([\\s-]+)(?:${GPT_SUFFIX})$`, 'i');
const SHARED_GPT_SUFFIX = new RegExp(`^(?:${GPT_SUFFIX})\\b`, 'i');

/**
 * 客户故事、市场稿、系统卡、退役公告。这些标题也带模型名和版本号，但都不是发布：
 *   「Model ML completes finance work more efficiently with GPT-5.6 Sol」—— 客户故事
 *   「GPT-5.5 System Card」                                        —— 配套文档，不是发布本身
 *   「Retiring GPT-4o, GPT-4.1…」                                  —— 下线公告
 *   「GPT-5.2 derives a new result in theoretical physics」        —— 能力展示
 */
const NOT_A_RELEASE = new RegExp(
  [
    '^(how |why |what |inside |retiring |introducing the )',
    '\\b(system card|bug bounty|case study|guide to|adoption|customer)\\b',
    '\\b(cuts?|saves?|scales?|expands?|brings?|helps?|builds?|moves?|completes?|derives?)\\b',
    '\\b(transformed|is now the preferred|comes to|bet on|for work:)\\b',
  ].join('|'),
  'i',
);

/**
 * 标题看起来像一次模型发布吗。
 *
 * 核心判据是**模型名的位置**，不是关键词黑名单 —— 后者在散文标题上太脆弱。
 * 反例：OpenAI 发 GPT-5.6 的标题是「GPT-5.6: Frontier intelligence that scales
 * with your ambition」，含 "scales" 一词，纯黑名单会把真发布误杀。
 *
 * 规律是：真发布把模型名放在最前面（「GPT-5.6: …」「Introducing Claude Opus 5」），
 * 客户故事和能力展示把模型名放在句子中间（「Model ML completes … with GPT-5.6 Sol」）。
 */
function looksLikeRelease(title) {
  const t = title.trim();

  // 「Introducing / Previewing / Announcing + 模型名」开头 —— 一定是发布
  const leadVerb = t.match(new RegExp(`^(${RELEASE_VERB.source.slice(2, -2)})\\s+`, 'i'));
  const rest = leadVerb ? t.slice(leadVerb[0].length) : t;

  const hit = rest.match(MODEL);
  if (!hit) return false;

  // 配套文档不是发布本身
  if (/\b(system card|model card|bug bounty)\b/i.test(t)) return false;

  // 模型名后面紧跟一个动作动词 → 是能力展示，不是发布。
  //   「GPT-5 lowers the cost of…」「GPT-5.2 derives a new result…」
  // 而发布标题模型名后面跟的是冒号或修饰语：「GPT-5.6: Frontier intelligence…」
  const after = rest.slice(hit.index + hit[0].length).trim();
  // 「is now the preferred model in…」这类是采用消息，不是发布
  if (
    /^(lowers|derives|solves|accelerates|helps|powers|beats|wins|scores|finds|discovers|cuts|saves)\b/i.test(after) ||
    /^(is|are)\s+now\b/i.test(after)
  ) {
    return false;
  }

  // 模型名前面只允许冠词一类的小词。
  // 别用「字符数小于 N」来近似 —— "How " 正好 4 个字符，会把
  // 「How GPT-5.6 fuses frontier intelligence…」这类稿子放进来。
  const prefix = rest.slice(0, hit.index).trim();
  if (prefix === '' || /^(the|a|an|new)$/i.test(prefix)) return true;

  return RELEASE_VERB.test(t) && !NOT_A_RELEASE.test(t);
}


/** Return model names explicitly announced in a release title. */
export function extractReleaseModelNames(title) {
  const normalized = title.normalize('NFKC').replace(/[\u2010\u2011\u2212]/g, '-').trim();
  if (!looksLikeRelease(normalized)) return [];

  const first = normalized.match(MODEL);
  const names = [first[0].trim()];
  let rest = normalized.slice(first.index + first[0].length);
  while (true) {
    const separator = rest.match(/^\s*(?:,\s*(?:(?:and|&)\s+)?|(?:and|&|\/)\s+)/i);
    if (!separator) break;
    const next = rest.slice(separator[0].length);
    const full = next.match(MODEL_AT_START);
    const shared = names.at(-1).match(QUALIFIED_GPT);
    const suffix = shared && next.match(SHARED_GPT_SUFFIX);
    if (full) {
      names.push(full[0].trim());
      rest = next.slice(full[0].length);
    } else if (suffix) {
      names.push(shared[1] + shared[2] + suffix[0]);
      rest = next.slice(suffix[0].length);
    } else {
      break;
    }
  }
  return [...new Map(names.map((name) => [name.toLowerCase(), name])).values()];
}

/** Filter candidates against models already in the catalog. */
export function selectNewModels(candidates, existing) {
  const ids = new Set(existing.map((model) => model.id));
  const key = (model) => JSON.stringify([
    model.url,
    model.name.normalize('NFKC').toLowerCase().replace(/[\s\u2010\u2011\u2212-]+/g, ' ').trim(),
  ]);
  const releases = new Set(existing.map(key));
  return candidates.filter((model) => {
    const release = key(model);
    if (ids.has(model.id) || releases.has(release)) return false;
    ids.add(model.id);
    releases.add(release);
    return true;
  });
}
