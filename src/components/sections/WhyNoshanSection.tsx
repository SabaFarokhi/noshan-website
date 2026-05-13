import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function WhyNoshanSection() {
  const t = useTranslations('whyNoshan');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const reasons = t.raw('reasons') as Array<{ title: string; description: string }>;

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center`}>

          {/* Image side */}
          <div className={`relative ${isRTL ? 'order-2' : 'order-1'}`}>
            <div className="relative rounded-3xl overflow-hidden bg-[#F4F2EE] shadow-2xl shadow-[#0A1628]/10">
              <Image
                src="/images/noshan.jpg"
                alt="Noshan Hosseini - Insurance Advisor"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Quote below image */}
            <div className={`mt-5 px-4 border-r-4 border-[#F5C518] ${isRTL ? 'text-right border-r-4 border-l-0' : 'border-l-4 border-r-0'}`}>
              <p className={`text-[#0A1628]/70 font-medium text-sm leading-relaxed italic ${isRTL ? 'font-persian not-italic' : ''}`}>
                {locale === 'fa'
                  ? '"هدفم اینه که بیمه رو ساده، قابل‌فهم و بدون فشار برای شما کنم."'
                  : '"My goal is to make insurance simple, clear, and pressure-free for you."'}
              </p>
              <p className={`text-[#F5C518] text-xs mt-1.5 font-semibold ${isRTL ? 'font-persian' : ''}`}>
                — {locale === 'fa' ? 'نوشان حسینی' : 'Noshan Hosseini'}
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className={`${isRTL ? 'order-1 text-right' : 'order-2'}`}>
            <p className="text-[#F5C518] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              {locale === 'fa' ? 'چرا نوشان' : 'Why Noshan'}
            </p>
            <h2 className={`text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4 leading-tight ${isRTL ? 'font-persian' : ''}`}>
              {t('title')}
            </h2>
            <p className={`text-[#0A1628]/55 text-lg mb-10 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>
              {t('subtitle')}
            </p>

            <div className="space-y-4">
              {reasons.slice(0, 4).map((r, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-2xl bg-[#F4F2EE] hover:bg-white hover:shadow-md hover:border-[#E5E1DA] border border-transparent transition-all duration-300`}>
                  <CheckCircle2 size={20} className="text-[#F5C518] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className={`font-bold text-[#0A1628] text-sm mb-0.5 ${isRTL ? 'font-persian' : ''}`}>{r.title}</h3>
                    <p className={`text-xs text-[#0A1628]/55 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-8 ${isRTL ? 'text-right' : ''}`}>
              <Link href="/about"
                className={`inline-flex items-center gap-2 text-sm font-semibold text-[#0A1628] hover:text-[#F5C518] transition-colors group ${isRTL ? 'font-persian' : ''}`}>
                {locale === 'fa' ? 'بیشتر درباره من بدانید' : 'Learn more about me'}
                <span className="w-6 h-px bg-[#0A1628] group-hover:bg-[#F5C518] group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
