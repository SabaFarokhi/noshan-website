import { useTranslations, useLocale } from 'next-intl';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fa' ? 'خدمات بیمه — نوشان حسینی' : 'Insurance Services — Noshan Hosseini',
    description:
      locale === 'fa'
        ? 'بیمه عمر، از کارافتادگی، بیماری‌های حاد، عمر دائمی، یونیورسال و مسافرتی در انتاریو.'
        : 'Life, disability, critical illness, whole life, universal life, and travel insurance in Ontario.',
  };
}

const serviceImages: Record<string, string> = {
  'life-insurance':             'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=900&q=95',
  'disability-insurance':       'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=95',
  'critical-illness-insurance': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=900&q=95',
  'whole-life-insurance':       'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=95',
  'universal-life-insurance':   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=95',
  'travel-insurance':           'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=95',
};

function ServicesContent() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const items = t.raw('items') as Array<{ slug: string; title: string; description: string }>;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <Navbar />
      <main className="pt-20">

        <section className="bg-[#0A1628] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className={`${isRTL ? 'text-right' : 'text-center'}`}>
              <div className={`inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full mb-6 ${isRTL ? 'font-persian' : 'uppercase tracking-widest'}`}>
                {locale === 'fa' ? 'خدمات ما' : 'Our Services'}
              </div>
              <h1 className={`text-3xl lg:text-4xl font-bold text-white mb-4 ${isRTL ? 'font-persian' : ''}`}>
                {t('title')}
              </h1>
              <p className={`text-white/50 text-lg max-w-2xl mx-auto ${isRTL ? 'font-persian' : ''}`}>
                {t('subtitle')}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F2EE] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E1DA] hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/6 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={serviceImages[item.slug] || serviceImages['life-insurance']}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h2 className={`text-lg font-bold text-[#0A1628] mb-2 ${isRTL ? 'font-persian' : ''}`}>
                      {item.title}
                    </h2>
                    <p className={`text-sm text-[#0A1628]/55 leading-relaxed mb-5 ${isRTL ? 'font-persian' : ''}`}>
                      {item.description}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] group-hover:text-[#C9A84C] transition-colors ${isRTL ? 'flex-row-reverse font-persian' : ''}`}>
                      {t('learnMore')}
                      <ArrowIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function ServicesPage() {
  return <ServicesContent />;
}
