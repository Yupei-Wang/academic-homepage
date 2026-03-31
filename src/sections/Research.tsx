import { useState } from 'react';
import { Brain, Users, MessageSquare, Wrench } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const researchAreas = [
  {
    icon: Brain,
    titleKey: 'research_llm_title',
    descKey: 'research_llm_desc',
    color: '#e8b4b8',
    bgColor: '#fdf2f3',
  },
  {
    icon: Users,
    titleKey: 'research_agents_title',
    descKey: 'research_agents_desc',
    color: '#b8c5b9',
    bgColor: '#f0f5f1',
  },
  {
    icon: MessageSquare,
    titleKey: 'research_ood_title',
    descKey: 'research_ood_desc',
    color: '#d4a5a9',
    bgColor: '#fbf0f1',
  },
  {
    icon: Wrench,
    titleKey: 'research_tools_title',
    descKey: 'research_tools_desc',
    color: '#9ab89c',
    bgColor: '#eef4ef',
  },
] as const;

export default function Research() {
  const { t } = useI18n();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section
      id="research"
      className="relative min-h-screen w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8b4b8]/5 via-transparent to-[#b8c5b9]/5 pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque'] mb-4"
          >
            {t('research_title')}
          </h2>
          <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto">
            {t('research_subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {researchAreas.map((area, index) => {
            const Icon = area.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={area.titleKey}
                className="research-card relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                    isHovered
                      ? 'bg-white border-[#e8b4b8]/50 soft-shadow-lg'
                      : 'bg-white border-[#e8b4b8]/20 soft-shadow hover:border-[#e8b4b8]/40'
                  }`}
                >
                  {/* Animated border gradient */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${area.color}, transparent)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isHovered ? 'scale-110' : ''
                    }`}
                    style={{
                      backgroundColor: area.bgColor,
                      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <Icon size={28} style={{ color: area.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#4a4a4a] mb-3 font-['Bricolage_Grotesque']">
                    {t(area.titleKey)}
                  </h3>
                  <p className="text-[#8a8a8a] leading-relaxed">{t(area.descKey)}</p>

                  {/* Accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 ${
                      isHovered ? 'w-full' : 'w-0'
                    }`}
                    style={{ backgroundColor: area.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#e8b4b8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#b8c5b9]/20 rounded-full blur-3xl" />
    </section>
  );
}
