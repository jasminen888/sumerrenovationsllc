import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Projects from '@/components/Projects';
import CtaBanner from '@/components/CtaBanner';
import EstimateCalculator from '@/components/EstimateCalculator';
import Testimonials from '@/components/Testimonials';
import ServiceAreas from '@/components/ServiceAreas';
import Blog from '@/components/Blog';
import Schedule from '@/components/Schedule';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import MobileActionBar from '@/components/MobileActionBar';
import StickyCta from '@/components/StickyCta';
import CountdownBanner from '@/components/CountdownBanner';
import FloatingCallButton from '@/components/FloatingCallButton';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';

export default function HomePage() {
  return (
    <>
      {/* Limited-time offer banner — top of page */}
      <CountdownBanner />

      {/* Sticky header */}
      <Header />

      {/* Main content */}
      <main>
        {/* 1. Hero + TrustBar overlay */}
        <Hero />

        {/* 2. Services */}
        <Services />

        {/* 3. Why Choose Us / About */}
        <WhyChooseUs />

        {/* 5. Projects / Portfolio */}
        <Projects />

        {/* 6. CTA Banner + Stats */}
        <CtaBanner />

        {/* 7. Instant Estimate Calculator */}
        <EstimateCalculator />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. Service Areas + Map */}
        <ServiceAreas />

        {/* 11. Renovation Blog */}
        <Blog />

        {/* 12. Schedule Appointment (Calendly) */}
        <Schedule />

        {/* 13. Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Chatbot */}
      <Chatbot />

      {/* Mobile sticky bottom action bar */}
      <MobileActionBar />

      {/* Sticky desktop CTA bar (appears after scrolling past hero) */}
      <StickyCta />

      {/* Mobile floating call button */}
      <FloatingCallButton />


      {/* Global scroll-reveal IntersectionObserver */}
      <ScrollRevealProvider />
    </>
  );
}
