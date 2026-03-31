import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { newsItems, type NewsKind } from '@/content/newsItems';

type Filter = 'all' | NewsKind;

export default function News() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    const sorted = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (filter === 'all') return sorted;
    return sorted.filter((i) => i.kind === filter);
  }, [filter]);

  const kindLabel = (kind: NewsKind) => {
    if (kind === 'blog') return t('news_filter_blog');
    return t('news_filter_note');
  };

  return (
    <section id="news" className="relative w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden">
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-4">
            {t('news_title')}
          </h2>
          <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto">
            {lang === 'zh' ? '博客更新与阅读笔记，持续记录研究过程。' : 'Blogs and reading notes to keep track of the research journey.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full border transition-colors duration-300 text-sm ${
              filter === 'all'
                ? 'bg-[#e8b4b8] border-[#e8b4b8] text-white'
                : 'bg-white border-[#e8b4b8]/30 text-[#8a8a8a] hover:border-[#e8b4b8]/60'
            }`}
          >
            {t('news_filter_all')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('blog')}
            className={`px-5 py-2 rounded-full border transition-colors duration-300 text-sm ${
              filter === 'blog'
                ? 'bg-[#e8b4b8] border-[#e8b4b8] text-white'
                : 'bg-white border-[#e8b4b8]/30 text-[#8a8a8a] hover:border-[#e8b4b8]/60'
            }`}
          >
            {t('news_filter_blog')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('note')}
            className={`px-5 py-2 rounded-full border transition-colors duration-300 text-sm ${
              filter === 'note'
                ? 'bg-[#e8b4b8] border-[#e8b4b8] text-white'
                : 'bg-white border-[#e8b4b8]/30 text-[#8a8a8a] hover:border-[#e8b4b8]/60'
            }`}
          >
            {t('news_filter_note')}
          </button>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {filtered.map((item) => (
            <article key={item.id} className="p-6 rounded-2xl bg-white border border-[#e8b4b8]/20 hover:border-[#e8b4b8]/40 transition-colors duration-300">
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#f5e6e8] text-[#d4a5a9] text-xs font-medium rounded-full border border-[#e8b4b8]/20">
                    {kindLabel(item.kind)}
                  </span>
                  <span className="text-[#8a8a8a] text-sm">{item.date}</span>
                </div>

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#e8b4b8] hover:text-[#d4a5a9] text-sm font-medium transition-colors"
                  >
                    {t('news_btn_read')}
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>

              <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
                {lang === 'zh' ? item.title.zh : item.title.en}
              </h3>
              <p className="mt-3 text-[#8a8a8a] leading-relaxed">
                {lang === 'zh' ? item.excerpt.zh : item.excerpt.en}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

