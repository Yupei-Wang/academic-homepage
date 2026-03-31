import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { useI18n } from '@/i18n/I18nProvider';
import LanguageToggle from '@/components/LanguageToggle';

const navLinks = [
  { key: 'nav_about', href: '#about' },
  { key: 'nav_research', href: '#research' },
  { key: 'nav_news', href: '#news' },
  { key: 'nav_publications', href: '#publications' },
] as const;

export default function Navigation() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 custom-expo ${
        isScrolled
          ? 'glass-morphism py-3 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-semibold text-[#4a4a4a] font-['Bricolage_Grotesque'] tracking-tight"
        >
          Pei Wang
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-sm text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors duration-300 group"
            >
              {t(link.key)}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e8b4b8] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          <a
            href="#footer"
            onClick={(e) => handleLinkClick(e, '#footer')}
            className="ml-4 px-5 py-2 bg-[#e8b4b8] text-white text-sm font-medium rounded-full hover:bg-[#d4a5a9] transition-colors duration-300 shadow-sm"
          >
            {t('nav_contact')}
          </a>

          <LanguageToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#4a4a4a] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-morphism transition-all duration-300 overflow-hidden shadow-lg ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors py-2"
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="#footer"
            onClick={(e) => handleLinkClick(e, '#footer')}
            className="px-5 py-2 bg-[#e8b4b8] text-white text-sm font-medium rounded-full text-center mt-2"
          >
            {t('nav_contact')}
          </a>

          <div className="mt-2">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
