'use client';

import { useRef, useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ITEMS = [
  {
    quote: "Professional, modern, and exactly what we needed. Our new website brought in more clients immediately.",
    name: "Sarah L.",
    role: "Client",
    initials: "SL",
  },
  {
    quote: "Fast, responsive, and easy to work with. Highly recommend for any business looking to grow online.",
    name: "Michael T.",
    role: "Client",
    initials: "MT",
  },
  {
    quote: "The design is clean and high-converting. We've seen a clear increase in leads.",
    name: "David R.",
    role: "Client",
    initials: "DR",
  },
  {
    quote: "Great communication and attention to detail. The final product exceeded expectations.",
    name: "Emily K.",
    role: "Client",
    initials: "EK",
  },
];

type CardItem = (typeof ITEMS)[number];
// Duplicate for seamless CSS marquee loop
const DOUBLED: CardItem[] = [...ITEMS, ...ITEMS];

// ─── Shimmer Stars ─────────────────────────────────────────────────────────────
function ShimmerStars({ active }: { active: boolean }) {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="#c9a84c"
          style={{
            width: 18, height: 18, flexShrink: 0,
            filter: active ? `drop-shadow(0 0 4px rgba(201,168,76,${0.6 + i * 0.08}))` : 'none',
            animation: active ? `tStarPulse 2.6s ease-in-out ${i * 0.13}s infinite` : 'none',
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Individual Testimonial Card ───────────────────────────────────────────────
function TestiCard({ item }: { item: CardItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -7, y: x * 10 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        width: 'clamp(280px, 34vw, 400px)',
        flexShrink: 0, borderRadius: 22,
        padding: '2rem 1.75rem',
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        userSelect: 'none', position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.04 : 1})`,
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease',
        willChange: 'transform',
        background: hov
          ? 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)'
          : 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid ${hov ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.22)'}`,
        boxShadow: hov
          ? '0 24px 60px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.15)'
          : '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', top: -50, right: -50,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Stars */}
      <ShimmerStars active={true} />

      {/* Quote */}
      <p style={{
        margin: 0, flexGrow: 1,
        color: 'rgba(255,255,255,0.88)',
        fontSize: '0.97rem', lineHeight: 1.75, fontStyle: 'italic',
        letterSpacing: '0.01em',
      }}>
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 50%, transparent 100%)',
      }} />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #c9a84c, #a0742a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.06em',
          border: '2px solid rgba(201,168,76,0.4)',
          boxShadow: '0 0 18px rgba(201,168,76,0.4)',
        }}>
          {item.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: 'white',
            fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.02em',
          }}>
            {item.name}
          </div>
          <div style={{
            color: 'rgba(201,168,76,0.7)',
            fontSize: '0.76rem', marginTop: 2, letterSpacing: '0.04em',
          }}>
            {item.role}
          </div>
        </div>

        {/* Decorative large quote mark */}
        <svg viewBox="0 0 40 32" fill="rgba(201,168,76,0.1)" style={{ width: 36, height: 29, flexShrink: 0 }} aria-hidden>
          <path d="M0 21.5V32h12V21.5C12 12.7 16.5 7 24.8 4.1L23 0 C12 3.8 0 11.5 0 21.5zm22 0V32h12V21.5C34 12.7 38.5 7 46.8 4.1L45 0C34 3.8 22 11.5 22 21.5z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #07111f 0%, #060d1a 55%, #09141f 100%)', padding: '7rem 0 6rem' }}
    >
      <style>{`
        @keyframes tStarPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; filter: drop-shadow(0 0 8px rgba(240,208,80,1)); }
        }
        @keyframes tMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Honeycomb background pattern ─────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            {/* Pointy-top hexagons, circumradius = 20, tile = 34.64 × 60 */}
            <pattern id="tHoneycomb" x="0" y="0" width="34.64" height="60" patternUnits="userSpaceOnUse">
              <polygon points="17.32,0 34.64,10 34.64,30 17.32,40 0,30 0,10"
                fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1" />
              <polygon points="0,30 17.32,40 17.32,60 0,70 -17.32,60 -17.32,40"
                fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1" />
              <polygon points="34.64,30 51.96,40 51.96,60 34.64,70 17.32,60 17.32,40"
                fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tHoneycomb)" />
        </svg>
      </div>

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '8%', left: '4%', width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)', filter: 'blur(55px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '4%', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,50,110,0.12) 0%, transparent 65%)', filter: 'blur(65px)',
        }} />
        <div style={{
          position: 'absolute', top: '48%', left: '50%', width: '75%', height: 1,
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)',
        }} />
      </div>

      {/* Section header */}
      <div className="relative z-10" style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 1rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 18px', borderRadius: 99,
          background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)',
          marginBottom: '1.4rem',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', display: 'inline-block',
            background: '#c9a84c', boxShadow: '0 0 10px rgba(201,168,76,0.9)',
          }} />
          <span style={{ color: 'rgba(201,168,76,0.9)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Client Testimonials
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(1.85rem, 3.8vw, 2.9rem)',
          fontWeight: 700, color: 'white', margin: '0 0 0.7rem',
          letterSpacing: '-0.025em', lineHeight: 1.15,
        }}>
          What Our Clients Say
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.38)', fontSize: '0.85rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, margin: 0,
        }}>
          Real Results. Real Clients. Real Growth.
        </p>
      </div>

      {/* Continuous marquee track */}
      <div
        className="relative z-10"
        style={{ overflow: 'hidden', padding: '12px 0 28px' }}
        role="region"
        aria-label="Client testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #060d1a 0%, transparent 100%)',
        }} />
        {/* Right fade */}
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(270deg, #060d1a 0%, transparent 100%)',
        }} />

        <div
          style={{
            display: 'flex',
            gap: 28,
            width: 'max-content',
            animation: 'tMarquee 30s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            paddingLeft: 28,
          }}
        >
          {DOUBLED.map((item, i) => (
            <TestiCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
