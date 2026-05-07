import { useTranslations, useLocale } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('process');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  return (
    <section className="bg-[#0A1628] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-16 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {locale === 'fa' ? 'فرآیند' : 'The Process'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 relative ${isRTL ? '' : ''}`}>
          {/* Connector */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-white/10" />

          {steps.map((s, i) => (
            <div key={i} className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-center text-center'}`}>
              <div className="w-[104px] h-[104px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <span className={`text-3xl font-bold text-[#C9A84C] ${isRTL ? 'font-persian' : ''}`}>{s.number}</span>
              </div>
              <h3 className={`text-xl font-bold text-white mb-3 ${isRTL ? 'font-persian' : ''}`}>{s.title}</h3>
              <p className={`text-white/45 text-sm leading-relaxed max-w-xs ${isRTL ? 'font-persian' : ''}`}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
