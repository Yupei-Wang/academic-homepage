import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from './i18n';
import { t as translate } from './i18n';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, ...args: any[]) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'lang';
const DEFAULT_LANG: Lang = 'en';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'zh' || saved === 'en') {
      setLangState(saved);
      return;
    }
    // No saved choice: follow configured default.
    setLangState(DEFAULT_LANG);
  }, []);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem(STORAGE_KEY, nextLang);
  };

  const value = useMemo<I18nContextValue>(() => {
    return {
      lang,
      setLang,
      t: (key: string, ...args: any[]) => translate(lang, key, ...args),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

