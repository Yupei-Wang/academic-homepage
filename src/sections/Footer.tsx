import { Mail, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const quickLinks = [
  { key: 'nav_about', href: '#about' },
  { key: 'nav_research', href: '#research' },
  { key: 'nav_news', href: '#news' },
  { key: 'nav_publications', href: '#publications' },
] as const;

const socialLinks = [
  {
    icon: BookOpen,
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=3YPB1hMAAAAJ&hl=en',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:wang_pei@ruc.edu.cn',
  },
];

export default function Footer() {
  const { t } = useI18n();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-white overflow-hidden"
    >
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1.5" fill="#e8b4b8" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-7xl mx-auto">
          {/* About */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-[#4a4a4a] font-['Bricolage_Grotesque']">
              Pei Wang
            </h3>
            <p className="text-[#8a8a8a] leading-relaxed max-w-md">{t('footer_contact_about_text')}</p>
            <div className="flex items-center gap-2 text-[#8a8a8a] text-sm">
              <MapPin size={16} className="text-[#e8b4b8]" />
              <span>中国人民大学，北京，中国</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-[#4a4a4a] font-['Bricolage_Grotesque']">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[#8a8a8a] hover:text-[#e8b4b8] transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#e8b4b8] group-hover:w-4 transition-all duration-300" />
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-[#4a4a4a] font-['Bricolage_Grotesque']">
              {t('footer_contact')}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8a8a8a] hover:text-[#e8b4b8] transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      <Icon size={18} />
                      {link.label}
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#e8b4b8]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8a8a8a] text-sm">
              © {new Date().getFullYear()} Pei Wang. All rights reserved.
            </p>
            <p className="text-[#8a8a8a] text-sm">
              Designed with <span className="text-[#e8b4b8]">♥</span> for AI Research
            </p>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <p className="text-[18vw] font-bold text-[#e8b4b8]/5 font-['Bricolage_Grotesque'] whitespace-nowrap leading-none translate-y-1/3 text-center">
          PEI WANG
        </p>
      </div>
    </footer>
  );
}
