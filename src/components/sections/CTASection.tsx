import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <section className="bg-[#F4F2EE] py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="bg-[#0A1628] rounded-3xl px-8 py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C9A84C] opacity-[0.05] rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-[0.03] rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="w-10 h-1 bg-[#C9A84C] mx-auto mb-8 rounded-full" />
            <h2 className={`text-3xl lg:text-4xl font-bold text-white mb-5 ${isRTL ? 'font-persian' : ''}`}>{t('title')}</h2>
            <p className={`text-white/50 text-lg mb-10 max-w-xl mx-auto ${isRTL ? 'font-persian' : ''}`}>{t('subtitle')}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8CC87] text-[#0A1628] font-bold text-sm px-8 py-4 rounded-full transition-colors duration-300 shadow-lg shadow-[#C9A84C]/20 ${isRTL ? 'font-persian' : ''}`}
              >
                {t('ctaBook')}
              </Link>
              <a
                href="https://wa.me/14379717732"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors duration-300 ${isRTL ? 'font-persian' : ''}`}
              >
                {t('ctaMessage')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
