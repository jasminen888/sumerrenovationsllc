'use client';

import { useEffect } from 'react';
import SectionAccent from './SectionAccent';

const perks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '30-Min Call',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'No Obligation',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone or Video',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '100% Free',
  },
];

export default function Schedule() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="schedule"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #152843 0%, #1a3050 50%, #152843 100%)' }}
    >
      {/* ── Honeycomb hex pattern ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3Cpolygon points='30,62 58,77 58,107 30,122 2,107 2,77' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 104px',
          opacity: 0.09,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#c9d8f0' }}>
              Free Consultation
            </span>
          </div>

          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-5">
            <SectionAccent />
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white leading-tight">
              Book Your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #c9a84c, #f5d06f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Free Consultation
              </span>
            </h2>
          </div>

          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(180,205,235,0.75)' }}>
            Pick a date and time that works for you. We&apos;ll review your project and map out the next steps — no pressure, no cost.
          </p>

          {/* Perk chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {perks.map((p) => (
              <div
                key={p.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  color: '#f5d06f',
                }}
              >
                <span style={{ color: '#c9a84c' }}>{p.icon}</span>
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Calendly card ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.18)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(to right, transparent 5%, #c9a84c 30%, #f5d06f 50%, #c9a84c 70%, transparent 95%)' }}
          />

          {/* Header bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(160,116,42,0.12))', border: '1px solid rgba(201,168,76,0.35)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#c9a84c' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sumer Renovations LLC</p>
                <p className="text-xs" style={{ color: 'rgba(200,214,230,0.5)' }}>30-Minute Project Consultation</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#6ee7b7' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available Now
            </div>
          </div>

          {/* Calendly embed */}
          <div className="p-2 sm:p-3">
            <div
              className="calendly-inline-widget rounded-2xl overflow-hidden"
              data-url="https://calendly.com/sumerrenovations/30min?hide_gdpr_banner=1&background_color=040d1a&text_color=ffffff&primary_color=c9a84c"
              style={{ minWidth: '320px', height: '900px' }}
              role="region"
              aria-label="Calendly scheduling widget for Sumer Renovations LLC consultation booking"
            />
          </div>

          {/* Trust footer */}
          <div
            className="flex flex-wrap items-center justify-center gap-5 px-6 py-5 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(200,214,230,0.45)' }}
          >
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Secure & Private' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', text: 'We never share your info' },
              { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', text: 'Cancel anytime' },
            ].map((t) => (
              <span key={t.text} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c9a84c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon} />
                </svg>
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
