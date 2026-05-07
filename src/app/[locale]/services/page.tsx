import { useTranslations, useLocale } from 'next-intl';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
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

        {/* Header */}
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

        {/* Cards grid */}
        <section className="bg-[#F4F2EE] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`group bg-white rounded-2xl border border-[#E5E1DA] hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/6 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="p-7">
                    <div className={`w-10 h-1 bg-[#C9A84C] rounded-full mb-5 ${isRTL ? 'mr-auto' : ''}`} />
                    <h2 className={`text-lg font-bold text-[#0A1628] mb-2 ${isRTL ? 'font-persian' : ''}`}>
                      {item.title}
                    </h2>
                    <p className={`text-sm text-[#0A1628]/55 leading-relaxed mb-6 ${isRTL ? 'font-persian' : ''}`}>
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
