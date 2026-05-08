import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

const groupImages: Record<string, string> = {
  Home:      'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=95',
  Globe:     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=95',
  Briefcase: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=95',
  User:      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=95',
  Building2: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=95',
};

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {groups.map((g, i) => (
            <div key={i} className={`group bg-[#F4F2EE] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#0A1628]/8 border border-transparent hover:border-[#E5E1DA] transition-all duration-300 ${isRTL ? 'text-right' : ''}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={groupImages[g.icon] || groupImages['Home']}
                  alt={g.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                <p className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} right-3 text-white font-bold text-sm leading-tight ${isRTL ? 'font-persian text-right' : ''}`}>
                  {g.title}
                </p>
              </div>
              <div className="p-4">
                <p className={`text-xs text-[#0A1628]/55 leading-relaxed ${isRTL ? 'font-persian' : ''}`}>{g.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
