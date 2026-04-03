import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export type MoodType =
  | 'positive'
  | 'neutral'
  | 'tired'
  | 'stressed'
  | 'excited'
  | 'anxious'
  | 'confused'
  | 'grateful'
  | 'sad';

/**
 * 存库用英文键：表示「对方对我来说的身份 / 关系」，不是社会职业标签。
 * 展示用 authorIdentityLabel
 */
export type AuthorIdentityKey =
  | 'self'
  | 'researcher'
  | 'for_fun';

export const AUTHOR_IDENTITY_OPTIONS: { value: AuthorIdentityKey; zh: string; en: string }[] = [
  { value: 'self', zh: '本人', en: 'Myself' },
  { value: 'researcher', zh: '学术同行', en: 'Research peer' },
  { value: 'for_fun', zh: '普通访客', en: 'Visitor' },
];

/** 旧版「职业/角色」选项：仅用于展示历史数据 */
const LEGACY_AUTHOR_IDENTITY: Record<string, { zh: string; en: string }> = {
  student: { zh: '（旧）本科生', en: '(legacy) Undergraduate' },
  graduate: { zh: '（旧）研究生', en: '(legacy) Graduate student' },
  faculty: { zh: '（旧）教师', en: '(legacy) Faculty' },
  visitor: { zh: '（旧）访客', en: '(legacy) Visitor' },
  alumni: { zh: '（旧）校友', en: '(legacy) Alumni' },
  industry: { zh: '（旧）业界', en: '(legacy) Industry' },
};

export function authorIdentityLabel(key: string | null, lang: 'zh' | 'en'): string {
  if (!key) return lang === 'zh' ? '匿名' : 'Anonymous';
  const opt = AUTHOR_IDENTITY_OPTIONS.find((o) => o.value === key);
  if (opt) return lang === 'zh' ? opt.zh : opt.en;
  const legacy = LEGACY_AUTHOR_IDENTITY[key];
  if (legacy) return lang === 'zh' ? legacy.zh : legacy.en;
  return key;
}

export type Thought = {
  id: string;
  author_identity: string | null;
  author_nickname: string | null;
  title: string;
  content: string | null;
  created_at: string;
  mood_type: MoodType | null;
};

