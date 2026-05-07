import { useTranslations, useLocale } from 'next-intl';
import { Home, Globe, Briefcase, User, Building2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Home, Globe, Briefcase, User, Building2 };

export default function WhoIHelpSection() {
  const t = useTranslations('whoIHelp');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const groups = t.raw('groups') as Array<{ title: string; description: string; icon: string }>;

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className={`text-center mb-16 ${isRTL ? 'font-persian' : ''}`}>
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {locale === 'fa' ? 'مشتریان' : 'Who I Help'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">{t('title')}</h2>
          <p className="text-[#0A1628]/55 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${isRTL ? '' : ''}`}>
          {groups.map((g, i) => {
            const Icon = iconMap[g.icon] || Home;
            return (
              <div key={i} className={`bg-[#F4F2EE] rounded-2xl p-6 hover:bg-white hover:shadow-lg hover:shadow-[#0A1628]/5 border border-transparent hover:border-[#E5E1DA] transition-all duration-300 ${isRTL ? 'text-right' : ''}`}>
                <div className={`mb-4 ${isRTL ? 'flex justify-end' : ''}`}>
                  <div className="w-11 h-11 bg-[#0A1628]/8 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-[#0A1628]" />
                  </div>
                </div>
                <h3 className={`font-bold text-[#0A1628] mb-1.5 ${isRTL ? 'font-persian' : ''}`}>{g.title}</h3>
                <p className={`text-sm text-[#0A1628]/55 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>{g.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
