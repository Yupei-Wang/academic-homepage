import { useState } from 'react';
import { ExternalLink, ChevronDown, Quote } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const publications = [
  {
    year: '2025',
    title: 'ShopSimulator: Evaluating and Exploring RL-Driven LLM Agent for Shopping Assistants',
    authors: 'P Wang, Y Wu, Xiaoshuai Song, Weixun Wang, Gengru Chen, ...',
    venue: 'arXiv preprint arXiv:2601.18225',
    citations: 0,
    abstract:
      '提出了一个用于评估和训练 RL 驱动大模型购物助手的大规模电商模拟环境，系统分析了不同模型在个性化、多轮交互和复杂商品检索场景下的表现，并探讨了监督微调与强化学习结合的效果。',
    link: 'https://arxiv.org/abs/2601.18225',
  },
  {
    year: '2024',
    title: 'MTU-Bench: A Multi-Granularity Tool-Use Benchmark for Large Language Models',
    authors: 'P Wang, Y Wu, Z Wang, J Liu, X Song, Z Peng, K Deng, C Zhang, J Wang, ...',
    venue: 'arXiv preprint arXiv:2410.11710',
    citations: 17,
    abstract:
      '提出了一个多粒度的工具使用基准测试，用于全面评估大语言模型的工具学习和使用能力。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:eQOLeE2rZwMC',
  },
  {
    year: '2024',
    title: 'Beyond the Known: Investigating LLMs Performance on Out-of-Domain Intent Detection',
    authors: 'P Wang, K He, Y Wang, X Song, Y Mou, J Wang, Y Xian, X Cai, W Xu',
    venue: 'Proceedings of the 2024 Joint International Conference on Computational Linguistics',
    citations: 32,
    abstract:
      '本文深入研究了大语言模型在开放域意图检测任务上的性能表现，提出了一系列评估方法和改进策略。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:YsMSGLbcyi4C',
  },
  {
    year: '2023',
    title: 'Watch the Neighbors: A Unified K-Nearest Neighbor Contrastive Learning Framework for OOD Intent Discovery',
    authors: 'P Wang, K He, Y Mou, X Song, Y Wu, J Wang, Y Xian, X Cai, W Xu',
    venue: 'Findings of the Association for Computational Linguistics: EMNLP 2023',
    citations: 20,
    abstract:
      '提出了一个统一的K近邻对比学习框架，用于开放域意图发现任务，显著提升了模型性能。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:d1gkVwhDpl0C',
  },
  {
    year: '2023',
    title: 'Large Language Models Meet Open-World Intent Discovery and Recognition: An Evaluation of ChatGPT',
    authors: 'X Song, K He, P Wang, G Dong, Y Mou, J Wang, Y Xian, X Cai, W Xu',
    venue: 'Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing',
    citations: 27,
    abstract:
      '系统评估了ChatGPT在开放世界意图发现和识别任务上的表现，揭示了大语言模型的优势与局限。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:zYLM7Y9cAGgC',
  },
  {
    year: '2023',
    title: 'Decoupling Pseudo Label Disambiguation and Representation Learning for Generalized Intent Discovery',
    authors: 'Y Mou, X Song, K He, C Zeng, P Wang, J Wang, Y Xian, W Xu',
    venue: 'Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics',
    citations: 13,
    abstract:
      '解耦了伪标签消歧和表示学习两个过程，提出了一种新的广义意图发现方法。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:qjMakFHDy7sC',
  },
  {
    year: '2022',
    title: 'Generalized Intent Discovery: Learning from Open World Dialogue System',
    authors: 'Y Mou, K He, P Wang, Y Wu, J Wang, W Wu, W Xu',
    venue: 'Proceedings of the 2022 Conference on Empirical Methods in Natural Language Processing',
    citations: 10,
    abstract:
      '研究了从开放世界对话系统中学习广义意图的方法，为实际应用场景提供了有效解决方案。',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=3YPB1hMAAAAJ&citation_for_view=3YPB1hMAAAAJ:u5HHmVD_uO8C',
  }
];

export default function Publications() {
  const { t, lang } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="publications"
      className="relative min-h-screen w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-4"
          >
            {t('publications_title')}
          </h2>
          <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto">
            {lang === 'zh' ? '在国际顶级会议和期刊上发表的研究成果' : 'Research results published in top conferences and journals'}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#e8b4b8] via-[#b8c5b9] to-[#e8b4b8]" />

          {/* Publications */}
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="timeline-item relative pl-8 md:pl-20 group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#e8b4b8] group-hover:bg-[#e8b4b8] group-hover:scale-125 transition-all duration-300" />

                {/* Year badge */}
                <div className="absolute left-8 md:left-24 top-4 px-3 py-1 bg-[#f5e6e8] text-[#d4a5a9] text-xs font-medium rounded-full">
                  {pub.year}
                </div>

                {/* Card */}
                <div
                  className={`mt-10 p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-white ${
                    expandedIndex === index
                      ? 'border-[#e8b4b8]/50 soft-shadow-lg'
                      : 'border-[#e8b4b8]/20 soft-shadow hover:border-[#e8b4b8]/40'
                  }`}
                  onClick={() => toggleExpand(index)}
                >
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-[#4a4a4a] group-hover:text-[#e8b4b8] transition-colors pr-8">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-[#8a8a8a] text-sm mt-2">{pub.authors}</p>

                  {/* Venue */}
                  <p className="text-[#b8c5b9] text-sm mt-1 italic">{pub.venue}</p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-[#8a8a8a] text-sm">
                      {t('publications_meta_cited', pub.citations)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className="flex items-center gap-1 text-[#8a8a8a] hover:text-[#e8b4b8] text-sm transition-colors"
                    >
                      {t('publications_btn_abstract')}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[#e8b4b8] hover:text-[#d4a5a9] text-sm transition-colors"
                    >
                      {t('publications_btn_view_paper')}
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Expanded abstract */}
                  {expandedIndex === index && (
                    <div className="mt-4 pt-4 border-t border-[#e8b4b8]/20">
                      <div className="flex gap-3">
                        <Quote size={20} className="text-[#e8b4b8] flex-shrink-0 mt-1" />
                        <p className="text-[#8a8a8a] text-sm leading-relaxed">
                          {pub.abstract}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="https://scholar.google.com/citations?user=3YPB1hMAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#e8b4b8] text-[#e8b4b8] font-medium rounded-full hover:bg-[#e8b4b8] hover:text-white transition-all duration-300"
          >
            <ExternalLink size={18} />
              {t('publications_btn_view_all')}
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#e8b4b8]/10 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
}
