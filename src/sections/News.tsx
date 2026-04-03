import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { newsItems } from '@/content/newsItems';
import {
  AUTHOR_IDENTITY_OPTIONS,
  authorIdentityLabel,
  hasSupabaseConfig,
  supabase,
  type AuthorIdentityKey,
  type Thought,
  type MoodType,
} from '@/lib/supabase';

export default function News() {
  const { t, lang } = useI18n();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [authorIdentity, setAuthorIdentity] = useState<AuthorIdentityKey | ''>('');
  const [authorNickname, setAuthorNickname] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType | ''>('');
  const [loading, setLoading] = useState(false);

  const sortedNews = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
  const totalBlogs = sortedNews.length;
  const latestBlogs = sortedNews.slice(0, 2);

  const describeNetworkError = (message: string) => {
    const isFetchFail =
      message.includes('Failed to fetch') ||
      message.includes('NetworkError') ||
      message.includes('Load failed');
    if (!isFetchFail) return message;
    return lang === 'zh'
      ? `${message}\n\n常见原因：当前网络无法稳定访问 Supabase（国内环境较常见），可换网络/代理后再试；或在浏览器开发者工具 → Network 中查看对 *.supabase.co 的请求是否被拦截。另请确认 GitHub Secrets 里的 VITE_SUPABASE_URL 为 https://xxx.supabase.co 且密钥未多余空格。`
      : `${message}\n\nCommon causes: your network cannot reach Supabase reliably (try another network/VPN), or the request is blocked—check DevTools → Network for *.supabase.co. Also verify VITE_SUPABASE_URL is https://xxx.supabase.co and keys have no extra spaces in GitHub Secrets.`;
  };

  const loadThoughts = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('thoughts')
        .select('id,author_identity,author_nickname,title,content,created_at,mood_type')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) {
        console.error(error);
        return;
      }
      setThoughts((data ?? []) as Thought[]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void loadThoughts();
  }, []);

  const onSubmitThought = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !title.trim() || !authorIdentity || !authorNickname.trim()) return;
    setLoading(true);
    try {
      const payload = {
        author_identity: authorIdentity,
        author_nickname: authorNickname.trim(),
        title: title.trim(),
        content: content.trim() || null,
        mood_type: mood || null,
      };
      const { error } = await supabase.from('thoughts').insert(payload);
      if (error) {
        alert(
          lang === 'zh'
            ? `保存失败：${describeNetworkError(error.message)}`
            : `Save failed: ${describeNetworkError(error.message)}`,
        );
        return;
      }
      setAuthorIdentity('');
      setAuthorNickname('');
      setTitle('');
      setContent('');
      setMood('');
      await loadThoughts();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert(
        lang === 'zh'
          ? `保存失败：${describeNetworkError(message)}`
          : `Save failed: ${describeNetworkError(message)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="news" className="relative w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden">
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-4">
            {t('news_title')}
          </h2>
          <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto">
            {lang === 'zh'
              ? '博客更新与心情记录，简单记下研究路上的想法。'
              : 'Blog updates and mood notes along the research journey.'}
          </p>
        </div>

        {lang === 'zh' ? (
          <div className="max-w-5xl mx-auto mt-10 lg:mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-start">
            <div className="bg-white/80 rounded-2xl border border-[#e8b4b8]/30 p-5 lg:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-2">
                博客
              </h3>
              <p className="text-[#8a8a8a] text-sm mb-3">最近两篇更新</p>
              <div className="flex justify-end mb-3">
                <a
                  href="#/blogs"
                  className="text-xs text-[#e8b4b8] hover:text-[#d4a5a9] font-medium"
                >
                  {`查看全部博客（共有${totalBlogs}篇）`} &rarr;
                </a>
              </div>
              <div className="space-y-6">
              {latestBlogs.map((item) => (
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

                  <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
                    {item.title.zh}
                  </h3>
                  {item.excerpt ? (
                    <p className="mt-3 text-[#8a8a8a] leading-relaxed">{item.excerpt.zh}</p>
                  ) : null}
                </article>
              ))}
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl border border-[#e8b4b8]/30 p-5 lg:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-2">
                心情
              </h3>
              <p className="text-[#8a8a8a] text-sm mb-4">写一句当下的心情，作为这段时间的小注脚。</p>
              <a
                href="#/moods"
                className="inline-flex items-center text-xs text-[#e8b4b8] hover:text-[#d4a5a9] font-medium mb-4"
              >
                查看全部心情卡片 &rarr;
              </a>

              {!hasSupabaseConfig ? (
                <div className="p-4 rounded-xl bg-white border border-[#e8b4b8]/30 text-sm text-[#8a8a8a]">
                  未检测到 Supabase 配置。请在环境变量中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。
                </div>
              ) : (
                <>
                  <form onSubmit={onSubmitThought} className="mt-2 p-4 rounded-2xl bg-white border border-[#e8b4b8]/20 space-y-3">
                    <div>
                      <label className="block text-sm text-[#8a8a8a] mb-1">身份（必选）</label>
                      <select
                        value={authorIdentity}
                        onChange={(e) => setAuthorIdentity(e.target.value as AuthorIdentityKey | '')}
                        className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 bg-white text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                      >
                        <option value="">请选择身份</option>
                        {AUTHOR_IDENTITY_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.zh}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      value={authorNickname}
                      onChange={(e) => setAuthorNickname(e.target.value)}
                      placeholder="昵称（必填，如：小王）"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                    />
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="标题（必填）"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                    />
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="内容（可选）"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="text-sm text-[#8a8a8a]">情绪标签：</label>
                      <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value as MoodType | '')}
                        className="px-3 py-2 rounded-xl border border-[#e8b4b8]/30 bg-white text-sm text-[#4a4a4a]"
                      >
                        <option value="">未选择（可选）</option>
                        <option value="positive">😊 开心</option>
                        <option value="neutral">😌 平静</option>
                        <option value="tired">🥱 疲惫</option>
                        <option value="stressed">😣 压力大</option>
                        <option value="excited">🤩 兴奋</option>
                        <option value="anxious">😟 焦虑</option>
                        <option value="confused">🤔 困惑</option>
                        <option value="grateful">🙏 感激</option>
                        <option value="sad">😢 难受</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !title.trim() || !authorIdentity || !authorNickname.trim()}
                      className="px-5 py-2 rounded-full bg-[#e8b4b8] text-white text-sm font-medium disabled:opacity-60"
                    >
                      {loading ? '保存中...' : '保存心情'}
                    </button>
                  </form>

                  <div className="mt-4 space-y-2">
                    {thoughts.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="truncate text-[#4a4a4a] max-w-[70%]">
                          {authorIdentityLabel(item.author_identity, lang) +
                            ' · ' +
                            (item.author_nickname ?? (lang === 'zh' ? '匿名' : 'Anonymous')) +
                            ' · ' +
                            item.title}
                        </span>
                        <span className="text-xs text-[#8a8a8a]">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    {thoughts.length > 2 ? (
                      <a
                        href="#/moods"
                        className="inline-block mt-1 text-xs text-[#e8b4b8] hover:text-[#d4a5a9]"
                      >
                        查看更多心情…
                      </a>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-10 lg:mt-14 space-y-8">
            <div className="bg-white/80 rounded-2xl border border-[#e8b4b8]/30 p-5 lg:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-2">
                Blogs
              </h3>
              <p className="text-[#8a8a8a] text-sm mb-3">Latest 2 updates</p>
              <div className="flex justify-end mb-3">
                <a
                  href="#/blogs"
                  className="text-xs text-[#e8b4b8] hover:text-[#d4a5a9] font-medium"
                >
                  {`View all blogs (${totalBlogs} total)`} &rarr;
                </a>
              </div>
              <div className="space-y-6">
                {latestBlogs.map((item) => (
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

                    <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
                      {item.title.en}
                    </h3>
                    {item.excerpt ? (
                      <p className="mt-3 text-[#8a8a8a] leading-relaxed">{item.excerpt.en}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            {/* English: Mood card as simple form, without recent titles */}
            <div className="bg-white/80 rounded-2xl border border-[#e8b4b8]/30 p-5 lg:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl md:text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-2">
                Mood
              </h3>
              <p className="text-[#8a8a8a] text-sm mb-4">
                Write a short mood note for yourself. It will not be translated.
              </p>
              <a
                href="#/moods"
                className="inline-flex items-center text-xs text-[#e8b4b8] hover:text-[#d4a5a9] font-medium mb-4"
              >
                View all mood cards &rarr;
              </a>

              {!hasSupabaseConfig ? (
                <div className="p-4 rounded-xl bg-white border border-[#e8b4b8]/30 text-sm text-[#8a8a8a]">
                  Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
                </div>
              ) : (
                <form onSubmit={onSubmitThought} className="mt-2 p-4 rounded-2xl bg-white border border-[#e8b4b8]/20 space-y-3">
                  <div>
                    <label className="block text-sm text-[#8a8a8a] mb-1">Identity (required)</label>
                    <select
                      value={authorIdentity}
                      onChange={(e) => setAuthorIdentity(e.target.value as AuthorIdentityKey | '')}
                      className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 bg-white text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                    >
                      <option value="">Select identity</option>
                      {AUTHOR_IDENTITY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    value={authorNickname}
                    onChange={(e) => setAuthorNickname(e.target.value)}
                    placeholder="Nickname (required, e.g. Alex)"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                  />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title (required)"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content (optional)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#e8b4b8]/30 focus:outline-none focus:ring-2 focus:ring-[#e8b4b8]/30"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-sm text-[#8a8a8a]">Mood:</label>
                    <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value as MoodType | '')}
                      className="px-3 py-2 rounded-xl border border-[#e8b4b8]/30 bg-white text-sm text-[#4a4a4a]"
                    >
                      <option value="">Not set (optional)</option>
                      <option value="positive">😊 Happy</option>
                      <option value="neutral">😌 Calm</option>
                      <option value="tired">🥱 Tired</option>
                      <option value="stressed">😣 Stressed</option>
                      <option value="excited">🤩 Excited</option>
                      <option value="anxious">😟 Anxious</option>
                      <option value="confused">🤔 Confused</option>
                      <option value="grateful">🙏 Grateful</option>
                      <option value="sad">😢 Sad</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !title.trim() || !authorIdentity || !authorNickname.trim()}
                    className="px-5 py-2 rounded-full bg-[#e8b4b8] text-white text-sm font-medium disabled:opacity-60"
                  >
                    {loading ? 'Saving...' : 'Save mood'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

