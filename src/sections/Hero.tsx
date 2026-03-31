import { ArrowDown, Sparkles } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export default function Hero() {
  const { t } = useI18n();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#research');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#faf8f5]"
    >
      {/* Content */}
      <div className="relative z-10 min-h-screen w-full px-6 lg:px-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-20">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <span
              className="inline-flex items-center gap-2 text-[#e8b4b8] text-sm font-medium tracking-wide"
            >
              <Sparkles size={16} />
              {t('hero_greeting')}
            </span>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] leading-tight"
            >
              Pei
              <br />
              <span className="text-gradient">Wang</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-[#b8c5b9] font-medium overflow-hidden whitespace-nowrap"
            >
              {t('hero_title')}
            </p>

            <p className="text-base md:text-lg text-[#8a8a8a] max-w-xl leading-relaxed">
              {t('hero_description')}
            </p>

            <div className="flex flex-col items-start gap-3">
              <a
                href="mailto:wang_pei@ruc.edu.cn"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-[#8a8a8a] hover:text-[#e8b4b8] transition-colors duration-300"
              >
                <span className="font-medium">
                  {t('hero_email_label')}
                </span>
                <span>wang_pei@ruc.edu.cn</span>
              </a>

              <a
                href="#research"
                onClick={handleCtaClick}
                className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-[#e8b4b8] text-white font-semibold rounded-full hover:bg-[#d4a5a9] transition-colors duration-300 group shadow-md"
              >
                {t('hero_cta_view_research')}
                <ArrowDown
                  size={18}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Right Content - Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div
              className="relative w-72 md:w-96 lg:w-[420px] aspect-[3/4] rounded-3xl overflow-hidden soft-shadow-lg"
            >
              <img
                src="/hero-portrait.jpg"
                alt="Pei Wang"
                className="w-full h-full object-cover"
              />
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/30 to-transparent" />
            </div>

            {/* Decorative elements - 柔和风格 */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-[#e8b4b8]/30 rounded-full" />
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#e8b4b8]/20 rounded-full blur-xl" />
            <div className="absolute top-1/2 -right-16 w-16 h-16 bg-[#b8c5b9]/30 rounded-full blur-lg" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent z-10" />
    </section>
  );
}
