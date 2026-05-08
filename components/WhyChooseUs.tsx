'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SectionAccent from './SectionAccent';

const HouseCanvas = dynamic(() => import('./HouseCanvas'), { ssr: false });

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured in Oregon and Washington. Every project is backed by proper permits and full liability coverage for your complete peace of mind.',
    proof: '✓ OR Licensed',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Quality Craftsmanship',
    description: 'We never cut corners. Every surface, joint, and finish is executed with professional-grade materials and techniques — delivering results that look stunning and last decades.',
    proof: '✓ 500+ Projects Completed',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Transparent Pricing',
    description: 'What we quote is what you pay. Our detailed estimates break down every cost before work begins — no hidden fees, no surprise charges, ever.',
    proof: '✓ No Hidden Fees',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Clear Communication',
    description: 'You\'re kept informed from first call to final walkthrough. Expect prompt responses, progress updates, and a dedicated point of contact throughout your project.',
    proof: '✓ Responds Within 24 Hours',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-Time Delivery',
    description: 'We respect your schedule as much as your home. Timelines are set, tracked, and honored — so your life gets back to normal as quickly as possible.',
    proof: '✓ On-Schedule Track Record',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Customer-First Mindset',
    description: 'Your vision drives every decision. We actively listen, offer expert guidance, and don\'t consider a project complete until you\'re fully thrilled with the result.',
    proof: '✓ 5-Star Rated',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Attention to Detail',
    description: 'From perfectly square tile layouts to flawless paint lines — the small things make the biggest impact. We obsess over every detail so you don\'t have to.',
    proof: '✓ Meticulous Finish Every Time',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Modern Design Expertise',
    description: 'We stay current with the latest design trends and materials, helping you choose styles that are both timeless and tailored to your personal taste and lifestyle.',
    proof: '✓ Design Guidance Included',
  },
];

const WCU_STAT_TARGETS = [
  { num: 500, suffix: '+', label: 'Projects Completed' },
  { num: 10,  suffix: '+', label: 'Years Experience' },
  { num: 98,  suffix: '%', label: 'Client Satisfaction' },
  { num: 5,   suffix: '★', label: 'Average Rating' },
] as const;

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const wcuAnimated = useRef(false);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);
  const [wcuCounts, setWcuCounts] = useState([0, 0, 0, 0]);

  // Animate counters when stats scroll into view
  useEffect(() => {
    const el = statsGridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wcuAnimated.current) {
          wcuAnimated.current = true;
          WCU_STAT_TARGETS.forEach(({ num }, i) => {
            const start = performance.now();
            const duration = 1800;
            const ease = (t: number) => 1 - Math.pow(1 - t, 3);
            const frame = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              setWcuCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(ease(t) * num);
                return next;
              });
              if (t < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          });
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setSpotlight(null), []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040d1a 0%, #0a1628 50%, #040d1a 100%)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor spotlight */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(700px circle at ${spotlight.x}px ${spotlight.y}px, rgba(201,168,76,0.11) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* ── Background ambient glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* left gold orb */}
        <div style={{
          position: 'absolute', top: '15%', left: '-5%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'floatOrb 8s ease-in-out infinite',
        }} />
        {/* right subtle orb */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '-8%',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'floatOrb 11s ease-in-out infinite reverse',
        }} />
        {/* center depth */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 900, height: 900, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,22,40,0.7) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── Subtle grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy + Stats ── */}
          <div>
            {/* pill tag */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.1)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c9a84c' }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Why Choose Us</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 mb-8">
              <SectionAccent />
              <h2 className="font-black text-white leading-[1.08]" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)' }}>
              The Sumer<br />
              Renovations{' '}
              <span style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #f5d06f 50%, #a0742a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Difference
              </span>
              </h2>
            </div>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(200,214,230,0.75)' }}>
              With years of experience transforming homes across Portland, Beaverton, Hillsboro, Lake Oswego, and the greater Oregon area, we&apos;ve built our reputation on trust, quality, and unwavering commitment to every homeowner we serve.
            </p>
            <p className="leading-relaxed mb-10" style={{ color: 'rgba(180,200,220,0.55)' }}>
              Every project is handled with the same professionalism — whether a kitchen repair in Beaverton, a bathroom renovation in Hillsboro, or a full luxury home remodel in Lake Oswego.
            </p>

            {/* Stats grid */}
            <div ref={statsGridRef} className="grid grid-cols-2 gap-3 mb-10">
              {WCU_STAT_TARGETS.map(({ suffix, label }, i) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-2xl p-4"
                  style={{
                    background: 'rgba(201,168,76,0.07)',
                    border: '1px solid rgba(201,168,76,0.22)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* inner shine */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)' }} />
                  <div className="text-3xl font-black mb-0.5" style={{
                    background: 'linear-gradient(135deg, #f5d06f, #c9a84c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{wcuCounts[i]}{suffix}</div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(200,214,230,0.65)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {['Licensed', 'Bonded', 'Insured', 'Local Business'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.13)',
                    color: 'rgba(240,248,255,0.88)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c9a84c' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            {/* Animated house */}
            <div className="mt-10 flex justify-center lg:justify-start pointer-events-none">
              <HouseCanvas />
            </div>
          </div>

          {/* ── Right: Feature cards ── */}
          <div className="grid grid-cols-2 gap-4">
            {features.slice(0, 6).map((feature, i) => (
              <div
                key={feature.title}
                className="wcu-card group relative overflow-hidden rounded-2xl p-5 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                }}
              >
                {/* top shine line */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)' }} />

                {/* hover radial glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.16) 0%, transparent 70%)',
                    transition: 'opacity 0.35s ease',
                  }}
                />

                {/* hover gold top border accent */}
                <div
                  className="pointer-events-none absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 rounded-full"
                  style={{
                    background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.22) 0%, rgba(160,116,42,0.12) 100%)',
                    border: '1px solid rgba(201,168,76,0.32)',
                    color: '#c9a84c',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: '0 0 0 0 rgba(201,168,76,0)',
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="font-bold text-white text-sm mb-2 leading-snug">{feature.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(180,200,220,0.6)' }}>{feature.description}</p>
                <span className="text-xs font-bold tracking-wide" style={{ color: '#c9a84c' }}>{feature.proof}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
