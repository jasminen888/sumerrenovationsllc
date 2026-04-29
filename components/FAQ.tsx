'use client';
import { useState, useEffect, useRef } from 'react';
import SectionAccent from './SectionAccent';

const faqs = [
  {
    q: 'How much does a kitchen renovation typically cost?',
    a: 'Kitchen renovations in the Portland/Vancouver area range from $25,000–$80,000+ depending on scope. A mid-range kitchen remodel (new cabinets, countertops, appliances, flooring) typically runs $35,000–$55,000. We provide a detailed, itemized quote with no hidden fees after your free consultation.'
  },
  {
    q: 'How long does a bathroom remodel take?',
    a: 'A standard bathroom remodel takes 2–4 weeks from demo to final inspection. Full primary-bath additions can run 4–8 weeks. We give you a firm project timeline upfront and keep you updated daily so there are never any surprises.'
  },
  {
    q: 'Do I need permits for my renovation?',
    a: 'Most structural, electrical, and plumbing work requires permits in Oregon and Washington. Sumer Renovations handles all permitting on your behalf — we know the local codes inside and out and include permit costs in our proposal so you never have to deal with the city yourself.'
  },
  {
    q: 'Will I need to move out during the renovation?',
    a: 'For most kitchen and bathroom remodels, you can stay in your home. We set up dust barriers, maintain a clean work site, and schedule noisy work during daytime hours. For full-home remodels, we\'ll advise you on the best approach based on scope and timeline.'
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Portland, Beaverton, Hillsboro, Lake Oswego, Tigard, West Linn, Oregon City, and the greater Vancouver/Clark County WA area. Contact us — if you\'re nearby, we\'re happy to discuss your project.'
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Sumer Renovations LLC is fully licensed in both Oregon and Washington, carries general liability insurance, and all subcontractors we use are verified licensed professionals. We carry coverage that protects both your home and our crew.'
  },
  {
    q: 'How do I get started? What does the process look like?',
    a: 'It\'s simple: (1) Book a free in-home consultation, (2) We develop a detailed scope, timeline, and fixed-price proposal, (3) You approve and we handle everything from permits to the final walkthrough. Most projects begin within 2–4 weeks of contract signing.'
  },
  {
    q: 'Do you offer financing options?',
    a: 'Yes — we partner with third-party lenders to offer 0% introductory financing for qualified homeowners. Ask about our financing options during your free consultation and we\'ll walk you through what\'s available based on your project.'
  }
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${open ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}`,
        transitionDelay: `${index * 40}ms`
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-white text-base pr-4 leading-snug">{item.q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300"
          style={{
            background: open ? 'linear-gradient(135deg,#c9a84c,#a0742a)' : 'rgba(201,168,76,0.15)',
            color: open ? 'white' : '#c9a84c',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="px-6 pb-5 text-white/65 text-sm leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #080e1c 0%, #0a1628 100%)' }}>
      <div
        className="max-w-3xl mx-auto transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(32px)' }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#c9a84c' }}>
            Got Questions?
          </p>
          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
            <SectionAccent />
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">Frequently Asked Questions</h2>
          </div>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Everything you need to know before starting your renovation project.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-10 text-center py-8 px-6 rounded-2xl"
          style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <p className="text-white/70 text-sm mb-4">Still have questions? We&apos;d love to help.</p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full font-bold text-sm"
            style={{ background: 'linear-gradient(135deg,#c9a84c,#a0742a)', color: 'white' }}
          >
            Ask Us Anything →
          </button>
        </div>
      </div>
    </section>
  );
}
