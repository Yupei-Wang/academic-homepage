import { GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export default function About() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden"
    >
      {/* Decorative rotating circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="#e8b4b8"
            strokeWidth="0.5"
            strokeDasharray="10 5"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - Vertical Title */}
          <div className="lg:col-span-2 relative">
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] lg:absolute lg:origin-top-left lg:whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {t('about_title')}
            </h2>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-10 space-y-8">
            <div className="space-y-4 max-w-3xl">
              {/* Person background (date timeline) */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#e8b4b8] tracking-wide">
                  {t('about_background_title')}
                </p>
                <p className="text-base text-[#4a4a4a] leading-relaxed">{t('about_background_line1')}</p>
                <p className="text-base text-[#4a4a4a] leading-relaxed">{t('about_background_line2')}</p>
              </div>
            </div>

            {/* Institution Info */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-[#e8b4b8]/30 shadow-sm">
                <Building2 size={20} className="text-[#e8b4b8]" />
                <span className="text-[#4a4a4a] text-sm">{t('about_institution_ruc')}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-[#b8c5b9]/30 shadow-sm">
                <GraduationCap size={20} className="text-[#b8c5b9]" />
                <span className="text-[#4a4a4a] text-sm">{t('about_institution_bupt_degree')}</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#publications"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#e8b4b8] hover:text-[#d4a5a9] transition-colors group"
            >
              {t('about_cta_view_publications')}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
