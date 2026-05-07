import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const items = t.raw('items') as Array<{ slug: string; title: string; description: string }>;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#F4F2EE] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-16 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {locale === 'fa' ? 'خدمات' : 'Services'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">{t('title')}</h2>
          <p className="text-[#0A1628]/55 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E1DA] hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/6 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
            >
              <div className="p-7">
                <div className={`w-10 h-1 bg-[#C9A84C] rounded-full mb-5 ${isRTL ? 'mr-auto' : ''}`} />
                <h3 className={`text-lg font-bold text-[#0A1628] mb-2 ${isRTL ? 'font-persian' : ''}`}>{item.title}</h3>
                <p className={`text-sm text-[#0A1628]/55 leading-relaxed mb-6 ${isRTL ? 'font-persian' : ''}`}>{item.description}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] group-hover:text-[#C9A84C] transition-colors ${isRTL ? 'flex-row-reverse font-persian' : ''}`}>
                  {t('learnMore')}
                  <Arrow size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
