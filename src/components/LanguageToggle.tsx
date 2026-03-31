import { useI18n } from '@/i18n/I18nProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  const next = lang === 'en' ? 'zh' : 'en';
  const label = lang === 'en' ? '中文' : 'EN';

  return (
    <button
      type="button"
      aria-label="切换语言"
      onClick={() => setLang(next)}
      className="ml-3 inline-flex items-center justify-center px-5 py-2 border border-[#e8b4b8]/50 text-[#e8b4b8] text-sm font-medium rounded-full hover:bg-[#e8b4b8]/10 transition-colors duration-300"
    >
      {label}
    </button>
  );
}

