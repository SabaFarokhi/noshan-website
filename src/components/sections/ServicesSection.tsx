'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const serviceImages: Record<string, string> = {
  'life-insurance':             'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=95',
  'disability-insurance':       'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=95',
  'critical-illness-insurance': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=1200&q=95',
  'whole-life-insurance':       'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=95',
  'universal-life-insurance':   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=95',
  'travel-insurance':           'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=95',
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const items = t.raw('items') as Array<{ slug: string; title: string; description: string }>;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  const activeItem = items[active];

  return (
    <section className="bg-[#F4F2EE] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-16 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#F5C518] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {locale === 'fa' ? 'خدمات' : 'Services'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">{t('title')}</h2>
          <p className="text-[#0A1628]/55 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 items-center ${isRTL ? '' : ''}`}>

          {/* Left — service list */}
          <div className={`space-y-1 ${isRTL ? 'order-2' : 'order-1'}`}>
            {items.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setActive(i)}
                className={`w-full group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${active === i ? 'bg-white shadow-lg shadow-[#0A1628]/6 border border-[#E5E1DA]' : 'hover:bg-white/50'}`}
              >
                {/* Index / active indicator */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${active === i ? 'bg-[#F5C518] text-[#0A1628]' : 'bg-[#0A1628]/8 text-[#0A1628]/40'}`}>
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-[#0A1628] transition-all duration-300 ${active === i ? 'text-base' : 'text-sm text-[#0A1628]/50'} ${isRTL ? 'font-persian' : ''}`}>
                    {item.title}
                  </p>
                  {active === i && (
                    <motion.p
                      className={`text-xs text-[#0A1628]/55 mt-1 leading-relaxed ${isRTL ? 'font-persian' : ''}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </div>

                {active === i && (
                  <Link
                    href={`/services/${item.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#F5C518] hover:text-[#0A1628] transition-colors ${isRTL ? 'flex-row-reverse font-persian' : ''}`}
                  >
                    {t('learnMore')}
                    <Arrow size={12} />
                  </Link>
                )}
              </button>
            ))}

            {/* Progress bar */}
            <div className="mt-6 h-0.5 bg-[#0A1628]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#F5C518] rounded-full"
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Right — image */}
          <div className={`relative rounded-3xl overflow-hidden h-72 lg:h-[460px] shadow-2xl shadow-[#0A1628]/12 ${isRTL ? 'order-1' : 'order-2'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                <Image
                  src={serviceImages[activeItem.slug] || serviceImages['life-insurance']}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeItem.slug + '-title'}
                  className={`text-white font-bold text-xl ${isRTL ? 'font-persian text-right' : ''}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {activeItem.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
