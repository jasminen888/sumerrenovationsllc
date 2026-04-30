'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';

// Lazy-load below-the-fold components for faster initial load
const Projects = dynamic(() => import('@/components/Projects'));
const CtaBanner = dynamic(() => import('@/components/CtaBanner'));
const EstimateCalculator = dynamic(() => import('@/components/EstimateCalculator'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const ServiceAreas = dynamic(() => import('@/components/ServiceAreas'));
const Blog = dynamic(() => import('@/components/Blog'));
const Schedule = dynamic(() => import('@/components/Schedule'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
const MobileActionBar = dynamic(() => import('@/components/MobileActionBar'), { ssr: false });
const StickyCta = dynamic(() => import('@/components/StickyCta'), { ssr: false });
const CountdownBanner = dynamic(() => import('@/components/CountdownBanner'));
const ScrollRevealProvider = dynamic(() => import('@/components/ScrollRevealProvider'));
const ScrollProgressBar = dynamic(() => import('@/components/ScrollProgressBar'), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* Gold scroll progress bar — fixed to top of viewport */}
      <ScrollProgressBar />

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

      {/* Sticky CTA bar — appears after 65% scroll on desktop */}
      <StickyCta />

      {/* Mobile sticky bottom action bar */}
      <MobileActionBar />

      {/* Global scroll-reveal IntersectionObserver */}
      <ScrollRevealProvider />
    </>
  );
}
