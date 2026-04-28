'use client';
import { useState, useEffect } from 'react';

// Set your offer deadline here — change as needed
const DEADLINE = new Date('2026-05-31T23:59:59');

function getTimeLeft() {
  const diff = DEADLINE.getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function CountdownBanner() {
  // Start null to avoid SSR/client hydration mismatch — populated after mount only
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Set initial value client-side only
    setTime(getTimeLeft());
    if (dismissed) return;
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed || !time) return null;

  const pad = (n: number) => String(n).padStart(2, '0');
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="relative z-50 w-full px-4 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white text-sm"
      style={{ background: 'linear-gradient(90deg, #0a1628, #0f2136 50%, #0a1628)', borderBottom: '1px solid rgba(201,168,76,0.3)' }}
    >
      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c 40%, #f5d06f 50%, #c9a84c 60%, transparent)' }} />

      <span className="font-semibold flex items-center gap-2">
        <span style={{ color: '#f5d06f' }}>🎁 Limited Offer:</span>
        <span className="text-white/85">Book before May 31 — Get a FREE Design Consultation</span>
        <span className="hidden sm:inline text-white/50 font-normal">(valued at $250)</span>
      </span>

      {/* Countdown */}
      <div className="flex items-center gap-1.5 font-mono">
        {[{ v: pad(time.d), u: 'd' }, { v: pad(time.h), u: 'h' }, { v: pad(time.m), u: 'm' }, { v: pad(time.s), u: 's' }].map(({ v, u }) => (
          <span key={u} className="flex items-center gap-0.5">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold"
              style={{ background: 'rgba(201,168,76,0.2)', color: '#f5d06f', border: '1px solid rgba(201,168,76,0.35)' }}
            >{v}</span>
            <span className="text-white/40 text-xs">{u}</span>
          </span>
        ))}
      </div>

      <button
        onClick={() => scrollTo('#contact')}
        className="px-4 py-1.5 rounded-full text-xs font-bold shrink-0"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white' }}
      >
        Claim Now →
      </button>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
