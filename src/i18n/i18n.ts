export type Lang = 'zh' | 'en';

type Dict = Record<Lang, Record<string, string | ((...args: any[]) => string)>>;

const dict: Dict = {
  zh: {
    // Navigation
    nav_about: '关于我',
    nav_research: '研究领域',
    nav_news: '动态',
    nav_publications: '发表论文',
    nav_projects: '项目',
    nav_contact: '联系我',

    // Hero
    hero_greeting: '你好，我是',
    hero_title: '人工智能研究者',
    hero_cta_view_research: '查看我的研究',
    hero_email_label: '邮箱：',

    // About
    about_title: '关于我',
    about_intro_current:
      '我是王霈。目前在中国人民大学高瓴人工智能学院读博士。',
    about_background_title: '背景',
    about_background_line1: '2025-今 中国人民大学高瓴人工智能学院 博士（导师 陈旭）',
    about_background_line2: '2022-2025 北京邮电大学 硕士（导师 徐蔚然）',
    about_stats_total_citations: '总引用次数',
    about_stats_hindex: 'h-index',
    about_stats_papers: '发表论文',
    about_stats_years: '年研究经验',
    about_cta_view_publications: '查看我的研究工作',

    // Research
    research_title: '研究领域',
    research_subtitle: '探索人工智能的前沿方向，关注模型能力、行为与社会影响。',
    research_llm_title: '大语言模型',
    research_llm_desc:
      '关注大语言模型的训练、微调与对齐技术，探索如何让模型更稳定、更可控地理解和生成人类语言。',
    research_agents_title: '智能体与社会模拟',
    research_agents_desc:
      '构建基于大模型的智能体，模拟社会现象与人类行为，研究多智能体协作、社会涌现与群体决策。',
    research_ood_title: '开放域意图识别',
    research_ood_desc:
      '研究对话系统中的开放域意图检测与发现，让 AI 能够处理未知和新兴的用户需求，并在开放环境中保持稳健。',
    research_tools_title: '工具使用与规划',
    research_tools_desc:
      '让大模型学会使用外部工具（检索、代码、环境接口等），提升其规划与问题求解能力，突破仅靠语言建模的局限。',

    // Projects
    projects_title: '精选项目',
    projects_subtitle: '探索我主导和参与的前沿研究项目',
    projects_cta_view_paper: '查看论文',
    projects_cta_code: '代码',

    // Publications
    publications_title: '发表论文',
    publications_meta_cited: (c: number) => `被引用 ${c} 次`,
    publications_btn_abstract: '摘要',
    publications_btn_view_paper: '查看论文',
    publications_btn_view_all: '查看全部论文',

    // Footer
    footer_quick_links: '快速链接',
    footer_contact: '联系方式',
    footer_contact_about_text: '人工智能研究者，专注于大语言模型、智能体与社会模拟。致力于推动AI技术的发展，构建更智能、更可靠的人工智能系统。',

    // News
    news_title: '动态',
    news_filter_all: '全部',
    news_filter_blog: '博客',
    news_filter_note: '阅读笔记',
    news_btn_read: '阅读',

    // About - Institutions
    about_institution_ruc: '中国人民大学',
    about_institution_bupt_degree: '北京邮电大学',

    // Hero - Person description
    hero_description:
      '专注于大语言模型、智能体与社会模拟。目前在中国人民大学高瓴人工智能学院读博士，师从陈旭老师。',

    // About content paragraphs (language-consistent)
    about_research_interests:
      '我的研究兴趣包括自然语言处理、大语言模型、智能体与社会模拟。我的研究工作专注于让 AI 系统更好地理解和适应开放世界的复杂性。',
    about_future_focus:
      '我相信人工智能的未来在于构建能够自主学习、适应和协作的智能系统。通过结合深度学习与认知科学的洞见，我致力于开发更智能、更可靠的 AI 技术。',
  },
  en: {
    // Navigation
    nav_about: 'About',
    nav_research: 'Research',
    nav_publications: 'Publications',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    // Hero
    hero_greeting: "Hello, I'm",
    hero_title: 'AI Researcher',
    hero_cta_view_research: 'View my research',
    hero_email_label: 'Email:',

    // About
    about_title: 'About',
    about_intro_current:
      'I am Pei Wang. I am currently a PhD student at the Gaoling School of Artificial Intelligence, Renmin University of China, advised by Xu Chen.',
    about_background_title: 'Background',
    about_background_line1:
      '2025–Present: PhD student, Gaoling School of Artificial Intelligence, Renmin University of China (advisor: Xu Chen)',
    about_background_line2:
      '2022–2025: M.S., Beijing University of Posts and Telecommunications (advisor: Weiran Xu)',
    about_stats_total_citations: 'Total citations',
    about_stats_hindex: 'h-index',
    about_stats_papers: 'Papers',
    about_stats_years: 'Years of research',
    about_cta_view_publications: 'View publications',

    // Research
    research_title: 'Research',
    research_subtitle:
      'Exploring the frontiers of AI, with a focus on model capability, behavior, and social impact.',
    research_llm_title: 'Large Language Models',
    research_llm_desc:
      'Studying training, fine-tuning, and alignment techniques for large language models, aiming for more stable and controllable understanding and generation.',
    research_agents_title: 'Agents & Social Simulation',
    research_agents_desc:
      'Building LLM-based agents to simulate social phenomena and human behavior, and to study multi-agent cooperation, emergence, and collective decision-making.',
    research_ood_title: 'Open-domain Intent Recognition',
    research_ood_desc:
      'Investigating open-domain intent detection and discovery in dialogue systems so that AI can handle novel and emerging user needs in open environments.',
    research_tools_title: 'Tool Use & Planning',
    research_tools_desc:
      'Teaching LLMs to use external tools—such as retrieval, code, and environment APIs—to improve planning and problem solving beyond pure language modeling.',

    // Projects
    projects_title: 'Selected projects',
    projects_subtitle:
      'Exploring the cutting-edge projects I lead and contribute to',
    projects_cta_view_paper: 'View paper',
    projects_cta_code: 'Code',

    // Publications
    publications_title: 'Publications',
    publications_meta_cited: (c: number) => `Cited ${c} times`,
    publications_btn_abstract: 'Abstract',
    publications_btn_view_paper: 'View paper',
    publications_btn_view_all: 'View all papers',

    // Footer
    footer_quick_links: 'Quick links',
    footer_contact: 'Contact',
    footer_contact_about_text:
      'AI researcher focused on large language models, agents, and social simulation. Dedicated to advancing AI technology and building smarter, more reliable AI systems.',

    // News
    nav_news: 'Updates',
    news_title: 'Updates',
    news_filter_all: 'All',
    news_filter_blog: 'Blogs',
    news_filter_note: 'Reading notes',
    news_btn_read: 'Read',

    // About - Institutions
    about_institution_ruc: 'Renmin University of China',
    about_institution_bupt_degree: 'Beijing University of Posts and Telecommunications',

    // Hero - Person description
    hero_description:
      'I focus on large language models, agents, and social simulation. I am currently a PhD student at the Gaoling School of Artificial Intelligence, Renmin University of China, advised by Xu Chen.',

    // About content paragraphs (language-consistent)
    about_research_interests:
      'My research interests include natural language processing, large language models, agents, and social simulation. My work focuses on helping AI systems better understand and adapt to the complexity of open-world environments.',
    about_future_focus:
      'I believe the future of AI lies in building intelligent systems that can learn autonomously, adapt, and collaborate. By combining deep learning with insights from cognitive science, I aim to develop smarter and more reliable AI technologies.',
  },
};

export function t(lang: Lang, key: string, ...args: any[]) {
  const entry = dict[lang][key];
  if (!entry) return key;
  if (typeof entry === 'function') {
    return entry(...args);
  }
  return entry;
}

