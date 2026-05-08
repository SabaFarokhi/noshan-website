'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── FULL-BLEED BACKGROUND IMAGE ── */}
      <Image
        src="https://images.unsplash.com/photo-1511895426328-dc8714191011?w=2400&q=95"
        alt="Insurance consultation"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Dark overlay — gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/55 to-[#0A1628]/30" />

      {/* ── CONTENT ── */}
      <div className={`relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto ${isRTL ? 'font-persian' : ''}`}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold px-5 py-2 rounded-full mb-8 ${isRTL ? '' : 'tracking-widest uppercase'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          {locale === 'fa' ? 'مشاور بیمه مجاز · FSRA · انتاریو' : 'FSRA Licensed Insurance Advisor · Ontario'}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-white font-bold leading-none mb-4"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
        >
          {locale === 'fa' ? 'نوشان حسینی' : 'Noshan Hosseini'}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-20 h-0.5 bg-[#C9A84C] rounded-full mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-white/85 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
        >
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8CC87] text-[#0A1628] font-bold text-sm px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#C9A84C]/30 ${isRTL ? 'font-persian' : ''}`}
          >
            {t('ctaBook')}
          </Link>
          <a
            href="https://wa.me/14379717732"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center border border-white/30 hover:border-white/70 hover:bg-white/10 text-white font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300 backdrop-blur-sm ${isRTL ? 'font-persian' : ''}`}
          >
            {t('ctaMessage')}
          </a>
        </motion.div>
      </div>

      {/* ── TRUST STRIP — bottom of screen ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-[#0A1628]/70 backdrop-blur-md border-t border-white/10">
          <div className={`max-w-4xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[
              { v: locale === 'fa' ? '۵۰۰+' : '500+',      l: locale === 'fa' ? 'خانواده محافظت‌شده' : 'Families Protected' },
              { v: 'FSRA',                                    l: locale === 'fa' ? 'مجاز رسمی'          : 'Officially Licensed' },
              { v: locale === 'fa' ? 'دوزبانه' : 'Bilingual', l: 'English · فارسی' },
              { v: locale === 'fa' ? 'رایگان' : 'Free',       l: locale === 'fa' ? 'مشاوره اول'         : 'First Consultation' },
            ].map((s, i) => (
              <div key={i} className={`flex flex-col items-center`}>
                <span className={`text-white font-bold text-base ${isRTL ? 'font-persian' : ''}`}>{s.v}</span>
                <span className={`text-white/60 text-[11px] mt-0.5 ${isRTL ? 'font-persian' : 'tracking-wide uppercase'}`}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
