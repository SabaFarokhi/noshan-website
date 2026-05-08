import { useTranslations, useLocale } from 'next-intl';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fa' ? 'وبلاگ — نوشان حسینی' : 'Blog — Noshan Hosseini',
    description:
      locale === 'fa'
        ? 'مقالات آموزشی درباره بیمه عمر، از کارافتادگی و راهنمای مهاجران در کانادا.'
        : 'Educational articles about life insurance, disability coverage, and insurance guidance for newcomers in Canada.',
  };
}

const postImages: Record<string, string> = {
  'why-life-insurance-matters':        'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=900&q=95',
  'newcomers-guide-to-insurance':      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=95',
  'disability-insurance-explained':    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=95',
  'critical-illness-coverage':         'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=900&q=95',
  'whole-vs-term-life-insurance':      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=95',
  'travel-insurance-tips':             'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=95',
};

const fallbackImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=95';

type BlogPost = { slug: string; title: string; excerpt: string; date: string; category: string; readTime: string };

function BlogContent() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const posts = t.raw('posts') as BlogPost[];
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#F4F2EE] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className={`mb-14 ${isRTL ? 'text-right font-persian' : 'text-center'}`}>
              <div className={`inline-flex items-center gap-2 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full mb-6 ${isRTL ? 'font-persian' : 'uppercase tracking-wide'}`}>
                {t('badge')}
              </div>
              <h1 className={`text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4 ${isRTL ? 'font-persian' : ''}`}>
                {t('title')}
              </h1>
              <p className={`text-[#0A1628]/55 text-lg max-w-2xl mx-auto ${isRTL ? 'font-persian' : ''}`}>
                {t('subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E1DA] hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/6 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={postImages[post.slug] || fallbackImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 to-transparent" />
                    <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                      <span className={`bg-[#C9A84C] text-[#0A1628] text-xs font-bold px-3 py-1 rounded-full ${isRTL ? 'font-persian' : ''}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className={`flex items-center gap-3 text-xs text-[#0A1628]/40 mb-3 ${isRTL ? 'flex-row-reverse font-persian' : ''}`}>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className={`text-lg font-bold text-[#0A1628] mb-3 group-hover:text-[#C9A84C] transition-colors leading-snug ${isRTL ? 'font-persian' : ''}`}>
                      {post.title}
                    </h2>
                    <p className={`text-sm text-[#0A1628]/55 leading-relaxed mb-5 ${isRTL ? 'font-persian' : ''}`}>
                      {post.excerpt}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] group-hover:text-[#C9A84C] transition-colors ${isRTL ? 'flex-row-reverse font-persian' : ''}`}>
                      {t('readMore')}
                      <ArrowIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function BlogPage() {
  return <BlogContent />;
}
