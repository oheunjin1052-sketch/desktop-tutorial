/**
 * Quote data & theme definitions
 * 고진감래 — 오늘을 버티는 한마디
 * 동양의 지혜를 쉬운 해석과 작은 행동으로 연결한 MVP 데이터
 */

const CATEGORIES = [
  "Motivation",
  "Courage",
  "Growth",
  "Responsibility",
  "Love",
  "Life",
  "Hope",
  "Success",
];

const THEMES = [
  {
    id: "minimal",
    name: "Minimal",
    type: "solid",
    background: "#E8E2D8",
    textColor: "#222222",
    gradient: "linear-gradient(160deg, #E8E2D8 0%, #d4cdc0 100%)",
  },
  {
    id: "dark",
    name: "Dark",
    type: "solid",
    background: "#111827",
    textColor: "#ffffff",
    gradient: "linear-gradient(160deg, #111827 0%, #030712 100%)",
  },
  {
    id: "nature",
    name: "Nature",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(160deg, #1b4332 0%, #2d6a4f 40%, #95d5b2 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(160deg, #ff6b35 0%, #f7c59f 45%, #ef476f 100%)",
  },
  {
    id: "ocean",
    name: "Ocean",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(160deg, #023e8a 0%, #0077b6 50%, #90e0ef 100%)",
  },
  {
    id: "mountain",
    name: "Mountain",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(180deg, #4a5568 0%, #2d3748 40%, #e2e8f0 100%)",
  },
  {
    id: "space",
    name: "Space",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(160deg, #0b1026 0%, #1a1a40 45%, #533483 100%)",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    type: "photo",
    textColor: "#ffffff",
    gradient:
      "linear-gradient(135deg, #1a0000 0%, #7f1d1d 40%, #450a0a 100%)",
  },
];

/** List-card accent gradients (xref xc1504 list look) */
const LIST_GRADIENTS = [
  "linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)",
  "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
  "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)",
  "linear-gradient(135deg, #ef4444 0%, #a855f7 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
  "linear-gradient(135deg, #84cc16 0%, #0d9488 100%)",
];

const quotes = [
  {
    id: 1,
    text: "고생이 다하면 즐거움이 찾아온다.",
    author: "苦盡甘來",
    source: "고진감래",
    category: "Hope",
    theme: "sunset",
    image: null,
    tags: ["hope", "challenge", "tired", "worried"],
    description: "지금 겪고 있는 어려움이 영원히 계속되는 것은 아닙니다.",
    action: "오늘 해결할 수 있는 일 한 가지에만 집중해보세요.",
  },
  {
    id: 2,
    text: "인생의 길흉화복은 쉽게 단정할 수 없다.",
    author: "塞翁之馬",
    source: "새옹지마",
    category: "Life",
    theme: "ocean",
    image: null,
    tags: ["life", "change", "perspective", "worried"],
    description: "지금의 불행이 훗날 복이 될 수도 있고, 지금의 행운이 언제나 계속되는 것도 아닙니다.",
    action: "오늘 일어난 일을 좋고 나쁨으로 서둘러 판단하지 말아보세요.",
  },
  {
    id: 3,
    text: "어려움을 잘 이겨내면 오히려 좋은 기회가 된다.",
    author: "轉禍爲福",
    source: "전화위복",
    category: "Hope",
    theme: "nature",
    image: null,
    tags: ["hope", "recovery", "opportunity", "discouraged"],
    description: "뜻하지 않은 어려움도 대응하는 방법에 따라 새로운 출발점이 될 수 있습니다.",
    action: "현재의 문제에서 얻을 수 있는 한 가지를 적어보세요.",
  },
  {
    id: 4,
    text: "큰 인물은 오랜 시간과 노력 끝에 이루어진다.",
    author: "大器晩成",
    source: "대기만성",
    category: "Growth",
    theme: "mountain",
    image: null,
    tags: ["growth", "patience", "success", "discouraged"],
    description: "성장이 늦다고 해서 가능성이 없는 것은 아닙니다. 깊고 단단한 성취에는 시간이 필요합니다.",
    action: "남과 비교하지 말고 어제보다 나아진 점 하나를 찾아보세요.",
  },
  {
    id: 5,
    text: "미리 준비하면 근심할 일이 없다.",
    author: "有備無患",
    source: "유비무환",
    category: "Responsibility",
    theme: "minimal",
    image: null,
    tags: ["preparation", "responsibility", "worried", "planning"],
    description: "모든 일을 통제할 수는 없지만, 작은 준비는 불안을 줄이고 선택의 여유를 만들어줍니다.",
    action: "내일 가장 중요한 일을 위해 지금 10분만 준비해보세요.",
  },
  {
    id: 6,
    text: "서로 배우고 다듬으며 함께 성장한다.",
    author: "切磋琢磨",
    source: "절차탁마",
    category: "Growth",
    theme: "nature",
    image: null,
    tags: ["growth", "learning", "relationship", "study"],
    description: "좋은 배움은 혼자 완성되지 않습니다. 서로의 생각을 나누고 꾸준히 연마할 때 더 단단해집니다.",
    action: "배우고 싶은 내용을 한 가지 질문하거나 기록해보세요.",
  },
  {
    id: 7,
    text: "일곱 번 넘어져도 여덟 번 다시 일어난다.",
    author: "七顚八起",
    source: "칠전팔기",
    category: "Courage",
    theme: "cinematic",
    image: null,
    tags: ["courage", "resilience", "failure", "discouraged"],
    description: "넘어지는 것은 끝이 아닙니다. 지금의 결과가 당신의 가능성을 결정하지 않습니다.",
    action: "오늘 포기하고 싶었던 일에 한 번만 더 도전해보세요.",
  },
  {
    id: 8,
    text: "작은 힘이라도 꾸준히 이어가면 큰일을 이룬다.",
    author: "愚公移山",
    source: "우공이산",
    category: "Motivation",
    theme: "mountain",
    image: null,
    tags: ["motivation", "persistence", "challenge", "work"],
    description: "처음에는 불가능해 보이는 일도 방향을 잃지 않고 계속하면 조금씩 현실로 바뀝니다.",
    action: "큰 목표를 오늘 할 수 있는 가장 작은 단계로 나눠보세요.",
  },
  {
    id: 9,
    text: "작은 물방울도 계속 떨어지면 돌을 뚫는다.",
    author: "水滴穿石",
    source: "수적천석",
    category: "Success",
    theme: "ocean",
    image: null,
    tags: ["success", "habit", "consistency", "study"],
    description: "눈에 띄지 않는 작은 노력도 매일 쌓이면 결국 단단한 변화를 만들어냅니다.",
    action: "매일 이어갈 수 있는 5분짜리 습관 하나를 시작해보세요.",
  },
  {
    id: 10,
    text: "수없이 꺾여도 뜻을 굽히지 않는다.",
    author: "百折不屈",
    source: "백절불굴",
    category: "Courage",
    theme: "space",
    image: null,
    tags: ["courage", "determination", "challenge", "tired"],
    description: "여러 번 좌절하더라도 마음속 뜻까지 꺾인 것은 아닙니다. 다시 방향을 잡으면 계속 나아갈 수 있습니다.",
    action: "지금 지키고 싶은 목표와 그 이유를 한 문장으로 적어보세요.",
  },
];

function getThemeById(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

function getQuoteById(id) {
  return quotes.find((q) => q.id === id);
}

function getListGradient(index) {
  return LIST_GRADIENTS[index % LIST_GRADIENTS.length];
}
