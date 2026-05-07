import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A1628]">
      <div className={`grid lg:grid-cols-2 min-h-screen ${isRTL ? '' : ''}`}>

        {/* ── TEXT SIDE ── */}
        <div className={`relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 pt-32 pb-16 lg:pt-0 ${isRTL ? 'order-2 items-end text-right' : 'order-1'}`}>
          {/* Subtle glow */}
          <div className="absolute top-1/3 left-0 w-64 h-64 bg-[#C9A84C] opacity-[0.06] rounded-full blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className={`relative inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/8 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full mb-8 w-fit ${isRTL ? 'font-persian' : 'tracking-widest uppercase'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            {t('badge')}
          </div>

          {/* Headline */}
          <h1 className={`relative font-bold text-white leading-[1.06] mb-6 ${isRTL ? 'font-persian' : ''}`}
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}>
            {isRTL ? (
              <>از خانواده،<br />درآمد و<br /><span className="text-[#C9A84C]">آینده‌تان</span><br />محافظت کنید.</>
            ) : (
              <>Protect your<br />family, income,<br />and <span className="text-[#C9A84C]">future.</span></>
            )}
          </h1>

          <p className={`relative text-white/55 leading-relaxed mb-10 max-w-md ${isRTL ? 'font-persian' : ''}`}
             style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}>
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div className={`relative flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link href="/contact"
              className={`inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8CC87] text-[#0A1628] font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#C9A84C]/25 ${isRTL ? 'font-persian' : ''}`}>
              {t('ctaBook')}
            </Link>
            <a href="https://wa.me/14379717732" target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 ${isRTL ? 'font-persian' : ''}`}>
              {t('ctaMessage')}
            </a>
          </div>

          {/* Trust strip */}
          <div className={`relative flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[
              { v: locale === 'fa' ? '۵۰۰+' : '500+', l: locale === 'fa' ? 'خانواده' : 'Families' },
              { v: 'FSRA', l: locale === 'fa' ? 'مجاز' : 'Licensed' },
              { v: locale === 'fa' ? 'دوزبانه' : 'Bilingual', l: 'EN · FA' },
            ].map((s, i) => (
              <div key={i} className={`flex flex-col ${isRTL ? 'items-end' : ''}`}>
                <span className={`text-white font-bold text-lg ${isRTL ? 'font-persian' : ''}`}>{s.v}</span>
                <span className={`text-white/35 text-[11px] mt-0.5 ${isRTL ? 'font-persian' : 'tracking-widest uppercase'}`}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHOTO SIDE ── */}
        <div className={`relative hidden lg:flex items-end justify-center bg-[#F4F2EE] overflow-hidden ${isRTL ? 'order-1' : 'order-2'}`}>
          {/* Warm gradient top */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F4F2EE] to-transparent z-10" />

          {/* Gold circle accent */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full border border-[#C9A84C]/15 pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full border border-[#C9A84C]/10 pointer-events-none" />

          {/* Noshan's photo — fills from bottom */}
          <div className="relative w-full h-full flex items-end justify-center">
            <Image
              src="/images/noshan-hero.jpg"
              alt="Noshan Hosseini — Insurance Advisor Ontario"
              width={560}
              height={740}
              className="object-contain object-bottom max-h-[92vh] w-auto relative z-20"
              priority
              sizes="50vw"
            />
          </div>

          {/* Floating credential badge */}
          <div className={`absolute bottom-10 ${isRTL ? 'right-10' : 'left-10'} z-30 bg-white rounded-2xl shadow-xl shadow-[#0A1628]/10 px-5 py-4 border border-[#E5E1DA]`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 bg-[#C9A84C]/10 rounded-full flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 bg-[#C9A84C] rounded-full" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className={`text-[12px] font-bold text-[#0A1628] ${isRTL ? 'font-persian' : ''}`}>
                  {locale === 'fa' ? 'مجاز FSRA · انتاریو' : 'FSRA Licensed · Ontario'}
                </p>
                <p className={`text-[11px] text-[#0A1628]/40 mt-0.5 ${isRTL ? 'font-persian' : ''}`}>
                  {locale === 'fa' ? 'مشاور بیمه رسمی' : 'Regulated Insurance Advisor'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile photo strip */}
      <div className="lg:hidden relative h-72 bg-[#F4F2EE] overflow-hidden flex items-end justify-center">
        <Image
          src="/images/noshan-hero.jpg"
          alt="Noshan Hosseini"
          width={300}
          height={380}
          className="object-contain object-bottom h-full w-auto"
          priority
        />
      </div>
    </section>
  );
}
