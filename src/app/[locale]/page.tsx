import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhoIHelpSection from '@/components/sections/WhoIHelpSection';
import WhyNoshanSection from '@/components/sections/WhyNoshanSection';
import ProcessSection from '@/components/sections/ProcessSection';
import FAQPreviewSection from '@/components/sections/FAQPreviewSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <WhoIHelpSection />
        <WhyNoshanSection />
        <ProcessSection />
        <FAQPreviewSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
