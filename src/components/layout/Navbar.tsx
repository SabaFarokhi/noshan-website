'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isRTL = locale === 'fa';
  const other = locale === 'en' ? 'fa' : 'en';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '/',         label: t('home') },
    { href: '/about',    label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/blog',     label: t('blog') },
    { href: '/faq',      label: t('faq') },
    { href: '/contact',  label: t('contact') },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E1DA]' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>

          {/* Logo */}
          <Link href="/" className={`flex flex-col ${isRTL ? 'items-end' : ''}`}>
            <span className={`text-[16px] font-bold leading-tight transition-colors duration-300 ${scrolled ? 'text-[#0A1628]' : 'text-white'} ${isRTL ? 'font-persian' : ''}`}>
              {locale === 'fa' ? 'نوشان حسینی' : 'Noshan Hosseini'}
            </span>
            <span className={`text-[11px] text-[#F5C518] font-semibold mt-0.5 ${isRTL ? 'font-persian' : 'tracking-widest uppercase'}`}>
              {locale === 'fa' ? 'مشاور بیمه' : 'Insurance Advisor'}
            </span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden lg:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors relative group ${scrolled ? 'text-[#0A1628]/65 hover:text-[#0A1628]' : 'text-white/80 hover:text-white'} ${isRTL ? 'font-persian' : ''}`}>
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5C518] group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className={`hidden lg:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href={pathname} locale={other}
              className={`flex items-center gap-1.5 text-sm transition-colors ${scrolled ? 'text-[#0A1628]/50 hover:text-[#0A1628]' : 'text-white/70 hover:text-white'}`}>
              <Globe size={14} />
              <span className={other === 'fa' ? 'font-persian' : ''}>{other === 'fa' ? 'فارسی' : 'English'}</span>
            </Link>
            <Link href="/contact"
              className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#0A1628] text-white hover:bg-[#142240]' : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'} ${isRTL ? 'font-persian' : ''}`}>
              {t('bookConsultation')}
            </Link>
          </div>

          {/* Mobile */}
          <div className={`flex lg:hidden items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href={pathname} locale={other} className={`text-sm transition-colors ${scrolled ? 'text-[#0A1628]/50' : 'text-white/70'}`}>
              <Globe size={16} />
            </Link>
            <button onClick={() => setOpen(!open)} className={`p-2 transition-colors ${scrolled ? 'text-[#0A1628]' : 'text-white'}`}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#E5E1DA]">
          <div className={`px-6 py-5 flex flex-col gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`text-lg font-semibold text-[#0A1628]/80 hover:text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}
              className={`mt-2 bg-[#0A1628] text-white text-sm font-semibold px-6 py-3 rounded-full ${isRTL ? 'font-persian' : ''}`}>
              {t('bookConsultation')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
