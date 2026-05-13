'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CTASection from '@/components/sections/CTASection';
import { ChevronDown } from 'lucide-react';

type FAQItem = { question: string; answer: string };
type FAQCategory = { title: string; items: FAQItem[] };

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const categories = t.raw('categories') as FAQCategory[];
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="bg-[#0A1628] py-20">
          <div className={`max-w-3xl mx-auto px-6 lg:px-10 ${isRTL ? 'text-right' : 'text-center'}`}>
            <div className={`inline-flex items-center gap-2 border border-[#F5C518]/30 bg-[#F5C518]/5 text-[#F5C518] text-xs font-semibold px-4 py-2 rounded-full mb-6 ${isRTL ? 'font-persian' : 'uppercase tracking-widest'}`}>
              {t('badge')}
            </div>
            <h1 className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${isRTL ? 'font-persian' : ''}`}>
              {t('title')}
            </h1>
            <p className={`text-white/50 text-lg ${isRTL ? 'font-persian' : ''}`}>
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-12">
            {categories.map((cat, ci) => (
              <div key={ci}>
                <h2 className={`text-xl font-bold text-[#0A1628] mb-5 pb-3 border-b border-[#E5E1DA] ${isRTL ? 'text-right font-persian' : ''}`}>
                  {cat.title}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    return (
                      <div key={key} className="bg-[#F4F2EE] rounded-2xl overflow-hidden border border-transparent hover:border-[#E5E1DA] transition-colors">
                        <button
                          onClick={() => setOpenKey(openKey === key ? null : key)}
                          className={`w-full flex items-center justify-between gap-4 px-6 py-5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                          aria-expanded={openKey === key}
                        >
                          <span className={`font-semibold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                            {item.question}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-[#0A1628]/40 transition-transform duration-200 ${openKey === key ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {openKey === key && (
                          <div className={`px-6 pb-5 ${isRTL ? 'text-right' : ''}`}>
                            <p className={`text-[#0A1628]/60 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
