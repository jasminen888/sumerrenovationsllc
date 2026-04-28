'use client';

import { useState, useEffect, useRef } from 'react';

// Parse each stat into { num, suffix } for animation
const statTargets = [
  { num: 500, suffix: '+' },
  { num: 5, suffix: '★' },
  { num: 100, suffix: '%' },
  { num: 10, suffix: '+' },
];

const stats = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4 6v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8 0a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    value: '500+',
    label: 'Projects Completed',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    value: '5★',
    label: 'Star Company',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '100%',
    label: 'Satisfaction',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    value: '10+',
    label: 'Years Experience',
  },
];

export default function CtaBanner() {
  const [counts, setCounts] = useState(statTargets.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          statTargets.forEach(({ num }, i) => {
            const start = performance.now();
            const duration = 1600;
            const ease = (t: number) => 1 - Math.pow(1 - t, 3);
            const frame = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const current = Math.round(ease(t) * num);
              setCounts((prev) => {
                const next = [...prev];
                next[i] = current;
                return next;
              });
              if (t < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          });
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section aria-label="Get a quote and company stats">
      {/* ── CTA Banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop')",
            backgroundPosition: 'center 15%',
          }}
        />
        {/* Gold honeycomb-style overlay — we use a warm amber tint + pattern */}
        <div className="absolute inset-0 bg-gold-500/80 mix-blend-multiply" />
        {/* Subtle hex pattern SVG overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v30l26 15z' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
          }}
        />

        {/* Decorative corner sparks */}
        <div className="absolute top-6 left-8 opacity-60 pointer-events-none">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <line x1="5" y1="25" x2="20" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="16" x2="25" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="28" cy="28" r="3" fill="#c9a84c" />
            <circle cx="35" cy="18" r="1.5" fill="white" />
          </svg>
        </div>
        <div className="absolute top-6 right-8 opacity-60 pointer-events-none">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <line x1="45" y1="25" x2="30" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="16" x2="25" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="22" cy="28" r="3" fill="#c9a84c" />
            <circle cx="15" cy="18" r="1.5" fill="white" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 py-20 px-4 text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-white/80" />
            <span className="text-white text-xs font-semibold tracking-[0.3em] uppercase">
              Start Your Project
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-8 drop-shadow-md">
            Get Your Free Project Quote
          </h2>

          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm hover:bg-white hover:text-charcoal transition-all duration-200"
            aria-label="Get a free project quote"
          >
            Get a Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="relative py-14 px-4 overflow-hidden"
        style={{ backgroundColor: '#0d3d5a' }}
      >
        {/* Subtle hex pattern on dark bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v30l26 15z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            >
              {/* Gold circle icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)' }}
              >
                {stat.icon}
              </div>

              <span className="font-serif text-3xl font-bold text-white mb-1">
                {counts[stats.indexOf(stat)]}{statTargets[stats.indexOf(stat)].suffix}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">
                {stat.label}
              </span>
              {/* Gold underline */}
              <span className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#c9a84c' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
