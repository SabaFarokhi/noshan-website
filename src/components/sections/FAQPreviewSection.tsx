'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

export default function FAQPreviewSection() {
  const t = useTranslations('faqPreview');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const [open, setOpen] = useState<number | null>(0);
  const items = t.raw('items') as Array<{ question: string; answer: string }>;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-12 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">{t('title')}</h2>
          <p className="text-[#0A1628]/55 text-lg">{t('subtitle')}</p>
        </div>

        <div className="space-y-3 mb-10">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-[#E5E1DA] overflow-hidden bg-[#F4F2EE]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between gap-4 px-6 py-5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <span className={`font-semibold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>{item.question}</span>
                <ChevronDown size={18} className={`shrink-0 text-[#0A1628]/40 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className={`px-6 pb-5 ${isRTL ? 'text-right' : ''}`}>
                  <p className={`text-[#0A1628]/60 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={isRTL ? 'text-right' : 'text-center'}>
          <Link
            href="/faq"
            className={`inline-flex items-center gap-2 text-sm font-semibold text-[#0A1628] hover:text-[#C9A84C] transition-colors group ${isRTL ? 'flex-row-reverse font-persian' : ''}`}
          >
            {t('viewAll')}
            <Arrow size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
