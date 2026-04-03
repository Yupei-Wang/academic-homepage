import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import {
  authorIdentityLabel,
  hasSupabaseConfig,
  supabase,
  type Thought,
  type MoodType,
} from '@/lib/supabase';

const moodLabel = (m: MoodType | null, lang: 'zh' | 'en') => {
  if (!m) return lang === 'zh' ? '未分类' : 'Uncategorized';
  const mapZh: Record<MoodType, string> = {
    positive: '😊 开心',
    neutral: '😌 平静',
    tired: '🥱 疲惫',
    stressed: '😣 压力大',
    excited: '🤩 兴奋',
    anxious: '😟 焦虑',
    confused: '🤔 困惑',
    grateful: '🙏 感激',
    sad: '😢 难受',
  };
  const mapEn: Record<MoodType, string> = {
    positive: '😊 Happy',
    neutral: '😌 Calm',
    tired: '🥱 Tired',
    stressed: '😣 Stressed',
    excited: '🤩 Excited',
    anxious: '😟 Anxious',
    confused: '🤔 Confused',
    grateful: '🙏 Grateful',
    sad: '😢 Sad',
  };
  return lang === 'zh' ? mapZh[m] : mapEn[m];
};

export default function MoodPage() {
  const { lang } = useI18n();
  const [items, setItems] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('thoughts')
        .select('id,author_identity,author_nickname,title,content,created_at,mood_type')
        .order('created_at', { ascending: false });
      setItems((data ?? []) as Thought[]);
      setLoading(false);
    };
    void load();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <main className="w-full max-w-5xl mx-auto px-6 py-16">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors"
        >
          <ArrowLeft size={16} />
          {lang === 'zh' ? '返回主页' : 'Back to home'}
        </a>

        <div className="mt-8 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
            {lang === 'zh' ? '心情' : 'Mood'}
          </h1>
          <p className="mt-3 text-[#8a8a8a]">
            {lang === 'zh'
              ? '公开留言板：请填写身份、昵称与内容。'
              : 'Public board: fill in identity, nickname, and your note.'}
          </p>
        </div>

        {!hasSupabaseConfig ? (
          <div className="p-4 rounded-xl bg-white border border-[#e8b4b8]/30 text-sm text-[#8a8a8a]">
            {lang === 'zh'
              ? '未检测到 Supabase 配置。请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。'
              : 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'}
          </div>
        ) : loading ? (
          <div className="text-[#8a8a8a]">{lang === 'zh' ? '加载中...' : 'Loading...'}</div>
        ) : items.length === 0 ? (
          <div className="text-[#8a8a8a]">{lang === 'zh' ? '还没有心情记录。' : 'No mood entries yet.'}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <article key={item.id} className="p-5 rounded-2xl bg-white border border-[#e8b4b8]/20">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-[#4a4a4a] text-lg">{item.title}</h3>
                    <span className="text-xs text-[#8a8a8a]">
                      {lang === 'zh'
                        ? `身份：${authorIdentityLabel(item.author_identity, lang)} · ${item.author_nickname ?? '匿名'}`
                        : `Identity: ${authorIdentityLabel(item.author_identity, lang)} · ${item.author_nickname ?? 'Anonymous'}`}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f5e6e8] text-xs text-[#d4a5a9] w-fit">
                      {moodLabel(item.mood_type, lang)}
                    </span>
                  </div>
                  <span className="text-xs text-[#8a8a8a]">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                {item.content ? (
                  <p className="mt-3 text-sm text-[#8a8a8a] leading-relaxed">{item.content}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
