import { useTranslations, useLocale } from 'next-intl';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CTASection from '@/components/sections/CTASection';
import { CheckCircle2, Shield, Award, Users } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fa' ? 'درباره نوشان حسینی — مشاور بیمه انتاریو' : 'About Noshan Hosseini — Insurance Advisor Ontario',
    description: locale === 'fa' ? 'آشنایی با نوشان حسینی، مشاور بیمه مجاز در انتاریو.' : 'Learn about Noshan Hosseini, a licensed insurance advisor in Ontario.',
  };
}

function AboutContent() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const values = t.raw('values') as string[];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A1628] py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className={`${isRTL ? 'text-right' : ''}`}>
              <div className={`inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full mb-6 ${isRTL ? 'font-persian' : 'tracking-widest uppercase'}`}>
                {t('badge')}
              </div>
              <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight ${isRTL ? 'font-persian' : ''}`}>{t('title')}</h1>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className={`grid lg:grid-cols-3 gap-10 ${isRTL ? 'text-right' : ''}`}>
              <div className="lg:col-span-2 space-y-5 text-[#0A1628]/70 leading-relaxed text-[17px]">
                <p className={isRTL ? 'font-persian' : ''}>{t('bio1')}</p>
                <p className={isRTL ? 'font-persian' : ''}>{t('bio2')}</p>
                <p className={isRTL ? 'font-persian' : ''}>{t('bio3')}</p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Shield, label: locale === 'fa' ? 'مجاز FSRA' : 'FSRA Licensed' },
                  { icon: Award, label: locale === 'fa' ? 'مشاور رسمی' : 'Certified Advisor' },
                  { icon: Users, label: locale === 'fa' ? '۵۰۰+ مشتری' : '500+ Clients' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className={`flex items-center gap-3 bg-[#F4F2EE] rounded-xl px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-9 h-9 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-[#C9A84C]" />
                    </div>
                    <span className={`font-semibold text-[#0A1628] text-sm ${isRTL ? 'font-persian' : ''}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F4F2EE] py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <h2 className={`text-2xl lg:text-3xl font-bold text-[#0A1628] mb-10 ${isRTL ? 'text-right font-persian' : 'text-center'}`}>{t('valueTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className={`flex items-start gap-3 bg-white rounded-2xl p-5 border border-[#E5E1DA] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <CheckCircle2 size={18} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span className={`font-medium text-[#0A1628] text-sm ${isRTL ? 'font-persian' : ''}`}>{v}</span>
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

export default function AboutPage() { return <AboutContent />; }
