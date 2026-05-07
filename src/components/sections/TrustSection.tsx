import { useTranslations, useLocale } from 'next-intl';

export default function TrustSection() {
  const t = useTranslations('trust');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  return (
    <section className="bg-white border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E5E1DA] ${isRTL ? '[direction:rtl]' : ''}`}>
          {stats.map((s, i) => (
            <div key={i} className={`px-8 py-10 flex flex-col gap-1 ${isRTL ? 'items-end text-right' : ''}`}>
              <span className={`font-bold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {s.value}
              </span>
              <span className={`text-xs text-[#0A1628]/60 font-medium ${isRTL ? 'font-persian' : 'tracking-wider uppercase'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
