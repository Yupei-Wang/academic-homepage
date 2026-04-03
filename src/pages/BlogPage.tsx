import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { newsItems } from '@/content/newsItems';

export default function BlogPage() {
  const { lang, t } = useI18n();
  const sorted = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <main className="w-full max-w-4xl mx-auto px-6 py-16">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors"
        >
          <ArrowLeft size={16} />
          {lang === 'zh' ? '返回主页' : 'Back to home'}
        </a>

        <div className="mt-8 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
            {lang === 'zh' ? '全部博客' : 'All blogs'}
          </h1>
          <p className="mt-3 text-[#8a8a8a]">
            {lang === 'zh'
              ? '按时间倒序列出所有博客条目。'
              : 'All blog entries in reverse chronological order.'}
          </p>
        </div>

        <div className="space-y-6">
          {sorted.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-[#e8b4b8]/20 hover:border-[#e8b4b8]/40 transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#f5e6e8] text-[#d4a5a9] text-xs font-medium rounded-full border border-[#e8b4b8]/20">
                    {t('news_filter_blog')}
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

              <h2 className="mt-4 text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
                {lang === 'zh' ? item.title.zh : item.title.en}
              </h2>
              {item.excerpt ? (
                <p className="mt-3 text-[#8a8a8a] leading-relaxed">
                  {lang === 'zh' ? item.excerpt.zh : item.excerpt.en}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

