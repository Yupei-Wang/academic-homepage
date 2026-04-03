export type NewsKind = 'blog' | 'note';

export type NewsItem = {
  id: string;
  date: string; // ISO date string: YYYY-MM-DD
  kind: NewsKind;
  title: { zh: string; en: string };
  excerpt?: { zh: string; en: string };
  href?: string;
};

// 你可以不定期在这里添加博客/阅读笔记条目：
// - href 可填外链（例如个人博客链接）
// - 如果内容很短，可以只写标题（不填 excerpt）
// - 如果没有 href，也可以只当作“记录”
export const newsItems: NewsItem[] = [
  {
    id: 'news-2026-04-02-1',
    date: '2026-04-02',
    kind: 'blog',
    title: {
      zh: 'Lipschitz 连续与 Lipschitz 常数：定义、性质与常数估计 ',
      en: 'Lipschitz Continuity and Lipschitz Constants: Definitions, Properties, and Estimation',
    },
    excerpt: {
      zh: '梳理 Lipschitz 连续的核心定义、常见等价形式，并总结从函数/模型结构推导或估计 Lipschitz 常数的实用方法与注意事项。',
      en: 'A structured summary of Lipschitz continuity: key definitions, common equivalent formulations, and practical ways to derive or estimate Lipschitz constants from function/model structure.',
    },
    href: 'https://my.feishu.cn/wiki/BoEpw6DSKiuiJpkrnXgc4BvRnvh?from=from_copylink',
  },
  {
    id: 'news-2026-03-21-1',
    date: '2026-03-21',
    kind: 'blog',
    title: {
      zh: 'LLM 社会模拟论文全景梳理：优化目标与评测一文看懂',
      en: 'LLM-based Social Simulation: A Survey of Objectives and Evaluation Protocols',
    },
    excerpt: {
      zh: '系统梳理近几年基于大模型的社会模拟工作：重点汇总它们的优化目标与评测方案，并对比不同路线的优缺点。',
      en: 'A systematic review of recent LLM-based social simulation work, focusing on their optimization objectives and evaluation protocols, with a comparison of strengths and limitations across approaches.',
    },
    href: 'https://my.feishu.cn/wiki/JcP6wTudfi6S8AkgzNycJet7nQh?from=from_copylink',
  },
  // {
  //   id: 'news-2026-03-10-1',
  //   date: '2026-03-10',
  //   kind: 'note',
  //   title: { zh: '阅读笔记：指令微调的对齐目标', en: 'Reading Notes: Alignment for Instruction Tuning' },
  //   excerpt: {
  //     zh: '总结最近一批关于对齐目标与训练信号选择的观点，附个人理解与待验证问题。',
  //     en: 'A summary of alignment objectives and training signal choices, with open questions.',
  //   },
  // },
];

