import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CTASection from '@/components/sections/CTASection';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

const VALID_SLUGS = [
  'life-insurance',
  'disability-insurance',
  'critical-illness-insurance',
  'whole-life-insurance',
  'universal-life-insurance',
  'travel-insurance',
];

const serviceImages: Record<string, string> = {
  'life-insurance':             'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1600&q=95',
  'disability-insurance':       'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=95',
  'critical-illness-insurance': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=1600&q=95',
  'whole-life-insurance':       'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=95',
  'universal-life-insurance':   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=95',
  'travel-insurance':           'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=95',
};

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: `servicePages.${slug}` });
  return {
    title: `${t('title')} — ${locale === 'fa' ? 'نوشان حسینی' : 'Noshan Hosseini'}`,
    description: t('subtitle'),
  };
}

function ServicePageContent({ slug }: { slug: string }) {
  const t = useTranslations(`servicePages.${slug as 'life-insurance'}`);
  const nav = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const benefits = t.raw('benefits') as string[];
  const types = t.raw('types') as Array<{ name: string; description: string }>;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero image banner */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={serviceImages[slug] || serviceImages['life-insurance']}
            alt={t('title')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto w-full px-6 lg:px-10 pb-10">
              <Link
                href="/services"
                className={`inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4 ${isRTL ? 'flex-row-reverse font-persian' : ''}`}
              >
                <BackArrow size={14} />
                {nav('backToServices')}
              </Link>
              <h1 className={`text-3xl lg:text-5xl font-bold text-white leading-tight ${isRTL ? 'text-right font-persian' : ''}`}>
                {t('title')}
              </h1>
            </div>
          </div>
        </div>

        {/* Subtitle strip */}
        <section className="bg-[#0A1628] py-6">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <p className={`text-white/60 text-lg leading-relaxed ${isRTL ? 'text-right font-persian' : ''}`}>
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Intro + Benefits */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className={`grid lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={isRTL ? 'lg:col-start-2 text-right' : ''}>
                <p className={`text-[#0A1628]/70 text-lg leading-relaxed ${isRTL ? 'font-persian' : ''}`}>
                  {t('intro')}
                </p>
              </div>
              <div className={isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <h2 className={`text-xl font-bold text-[#0A1628] mb-5 ${isRTL ? 'text-right font-persian' : ''}`}>
                  {locale === 'fa' ? 'مزایای کلیدی' : 'Key Benefits'}
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle2 size={18} className="text-[#C9A84C] shrink-0 mt-0.5" />
                      <span className={`text-[#0A1628]/70 ${isRTL ? 'font-persian' : ''}`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Coverage */}
        <section className="bg-[#F4F2EE] py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <h2 className={`text-2xl font-bold text-[#0A1628] mb-8 ${isRTL ? 'text-right font-persian' : ''}`}>
              {locale === 'fa' ? 'انواع پوشش' : 'Types of Coverage'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {types.map((type, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-6 border border-[#E5E1DA] hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="w-8 h-1 bg-[#C9A84C] rounded-full mb-4" />
                  <h3 className={`font-bold text-[#0A1628] mb-2 ${isRTL ? 'font-persian' : ''}`}>
                    {type.name}
                  </h3>
                  <p className={`text-sm text-[#0A1628]/60 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>
                    {type.description}
                  </p>
                </div>
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();
  return <ServicePageContent slug={slug} />;
}
