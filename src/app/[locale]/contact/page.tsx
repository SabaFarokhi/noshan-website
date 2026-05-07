import { useLocale } from 'next-intl';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ContactForm from '@/components/sections/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fa' ? 'تماس — نوشان حسینی' : 'Contact — Noshan Hosseini',
    description:
      locale === 'fa'
        ? 'مشاوره رایگان بیمه با نوشان حسینی در انتاریو. با ما تماس بگیرید.'
        : 'Book a free insurance consultation with Noshan Hosseini in Ontario.',
  };
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
