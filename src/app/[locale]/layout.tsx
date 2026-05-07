import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFA = locale === 'fa';

  return {
    title: isFA
      ? 'نوشان حسینی — مشاور بیمه انتاریو'
      : 'Noshan Hosseini — Insurance Advisor Ontario',
    description: isFA
      ? 'مشاور بیمه مجاز در انتاریو. بیمه عمر، از کارافتادگی، بیماری‌های حاد و مسافرتی برای خانواده‌ها، مهاجران و صاحبان کسب‌وکار.'
      : 'Licensed insurance advisor in Ontario. Life, disability, critical illness, and travel insurance for families, newcomers, and business owners.',
    metadataBase: new URL('https://noshanhosseini.ca'),
    openGraph: {
      title: isFA ? 'نوشان حسینی — مشاور بیمه' : 'Noshan Hosseini — Insurance Advisor',
      locale: isFA ? 'fa_IR' : 'en_CA',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'fa';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={inter.variable}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`min-h-screen flex flex-col ${
          isRTL ? 'font-persian' : 'font-sans'
        } antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
