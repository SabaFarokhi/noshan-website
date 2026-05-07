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
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? '' : ''}`}>

          {/* Photo side */}
          <div className={`relative ${isRTL ? 'order-2' : 'order-1'}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#0A1628]/10">
              <Image
                src="/images/noshan-hero.jpg"
                alt="Noshan Hosseini — Insurance Advisor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              {/* Quote on photo */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className={`text-white font-semibold text-sm leading-relaxed ${isRTL ? 'font-persian text-right' : ''}`}>
                  {locale === 'fa'
                    ? '"هدفم اینه که بیمه رو ساده، قابل‌فهم و بدون فشار برای شما کنم."'
                    : '"My goal is to make insurance simple, clear, and pressure-free for you."'}
                </p>
                <p className={`text-[#C9A84C] text-xs mt-1.5 font-medium ${isRTL ? 'font-persian text-right' : ''}`}>
                  — {locale === 'fa' ? 'نوشان حسینی' : 'Noshan Hosseini'}
                </p>
              </div>
            </div>
            {/* Gold accent corner */}
            <div className={`absolute -bottom-5 ${isRTL ? '-left-5' : '-right-5'} w-28 h-28 border-2 border-[#C9A84C]/25 rounded-3xl pointer-events-none`} />
          </div>

          {/* Text side */}
          <div className={`${isRTL ? 'order-1 text-right' : 'order-2'}`}>
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
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
                <div key={i} className={`flex gap-4 p-4 rounded-2xl bg-[#F4F2EE] hover:bg-white hover:shadow-md hover:border-[#E5E1DA] border border-transparent transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <CheckCircle2 size={20} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <div>
                    <h3 className={`font-bold text-[#0A1628] text-sm mb-0.5 ${isRTL ? 'font-persian' : ''}`}>{r.title}</h3>
                    <p className={`text-xs text-[#0A1628]/55 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-8 ${isRTL ? 'text-right' : ''}`}>
              <Link href="/about"
                className={`inline-flex items-center gap-2 text-sm font-semibold text-[#0A1628] hover:text-[#C9A84C] transition-colors group ${isRTL ? 'flex-row-reverse font-persian' : ''}`}>
                {locale === 'fa' ? 'بیشتر درباره من بدانید' : 'Learn more about me'}
                <span className="w-6 h-px bg-[#0A1628] group-hover:bg-[#C9A84C] group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
