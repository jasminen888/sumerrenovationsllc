'use client';
import { useState, useEffect, useRef } from 'react';
import SectionAccent from './SectionAccent';

const faqs = [
  {
    q: 'How much does kitchen remodeling cost in Portland?',
    a: 'Kitchen remodeling in Portland typically ranges from $25,000 to $80,000+ depending on scope, materials, and layout changes. A mid-range kitchen renovation — new custom cabinets, quartz countertops, updated appliances, and fresh flooring — usually lands between $35,000 and $55,000. We provide a detailed, itemized quote with no hidden fees after your free in-home consultation.',
  },
  {
    q: 'What areas does Sumer Renovations LLC serve?',
    a: 'Sumer Renovations LLC serves the greater Portland metro area and beyond — including Beaverton, Hillsboro, Lake Oswego, Wilsonville, Vancouver WA, Eugene, Corvallis, and surrounding communities. If you\'re within roughly 100 miles of Portland, reach out and we\'ll discuss your project.',
  },
  {
    q: 'Do you provide roofing installation in Beaverton and surrounding cities?',
    a: 'Yes — we offer professional roofing installation, repair, and replacement throughout Beaverton, Hillsboro, Portland, Lake Oswego, Wilsonville, and the broader Oregon/SW Washington region. Every roofing project is fully permitted and backed by our craftsmanship warranty.',
  },
  {
    q: 'What renovation services do you offer?',
    a: 'We offer a comprehensive range of home renovation services: kitchen remodeling, bathroom renovation, full home renovation, exterior renovation, flooring installation, roofing installation, deck installation, painting, landscaping design, and custom builds. Whether you need a single-room refresh or a whole-home transformation, our team handles everything from design through final walkthrough.',
  },
  {
    q: 'Do you provide luxury home remodeling?',
    a: 'Absolutely. Luxury home remodeling is one of our specialties, particularly in Lake Oswego, Portland\'s West Hills, and other premier neighborhoods. We work with high-end materials — waterfall quartz islands, custom millwork, spa-quality tile, and designer fixtures — to create homes that are as beautiful as they are functional.',
  },
  {
    q: 'How long does a bathroom renovation take?',
    a: 'A standard bathroom renovation typically takes 2–4 weeks from demolition to final inspection. Larger projects — primary suite additions, full gut-renovations, or custom tile work — can run 4–8 weeks. We provide a firm project timeline upfront and keep you updated daily so there are never surprises.',
  },
  {
    q: 'Do I need permits for my renovation?',
    a: 'Most structural, electrical, and plumbing work requires permits in Oregon and Washington. Sumer Renovations handles all permitting on your behalf — we know the local codes inside and out and include permit costs in your proposal so you never have to deal with the city yourself.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Sumer Renovations LLC is fully licensed in both Oregon and Washington, carries general liability insurance, and all subcontractors we use are verified licensed professionals. We carry coverage that protects both your home and our crew throughout the entire project.',
  },
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" ref={ref} className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #080e1c 0%, #0a1628 100%)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            Common questions about home renovation, remodeling costs, and our services in Portland, Beaverton, Hillsboro, and the greater Oregon area.
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
