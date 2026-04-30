'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ITEMS = [
  {
    quote: "Professional, modern, and exactly what we needed. Our new website brought in more clients immediately.",
    name: "Sarah L.",
    role: "Small Business Owner",
    initials: "SL",
  },
  {
    quote: "Fast, responsive, and easy to work with. Highly recommend for any business looking to grow online.",
    name: "Michael T.",
    role: "Contractor",
    initials: "MT",
  },
  {
    quote: "The design is clean and high-converting. We've seen a clear increase in leads.",
    name: "David R.",
    role: "Startup Founder",
    initials: "DR",
  },
  {
    quote: "Great communication and attention to detail. The final product exceeded expectations.",
    name: "Emily K.",
    role: "Local Business Owner",
    initials: "EK",
  },
];

type CardItem = (typeof ITEMS)[number];
const N = ITEMS.length;
// Clone: [last, ...real items, first] — indices 0 and N+1 are the ghost clones
const EXTENDED: CardItem[] = [ITEMS[N - 1], ...ITEMS, ITEMS[0]];

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

// ─── Nav Arrow Button ──────────────────────────────────────────────────────────
function NavArrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      style={{
        width: 52, height: 52, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', border: 'none', padding: 0, flexShrink: 0,
        background: hov ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)',
        outline: `1px solid ${hov ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: hov ? '0 0 26px rgba(201,168,76,0.22), inset 0 0 14px rgba(201,168,76,0.05)' : 'none',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.25s ease',
      }}
    >
      <svg
        width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={hov ? '#c9a84c' : 'rgba(255,255,255,0.55)'}
        strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'stroke 0.25s ease', transform: dir === 'prev' ? 'translateX(-1px)' : 'translateX(1px)' }}
      >
        {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

// ─── Individual Testimonial Card ───────────────────────────────────────────────
function TestiCard({
  item, isActive, isAdj, cardW,
}: {
  item: CardItem; isActive: boolean; isAdj: boolean; cardW: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const scale = isActive ? (hov ? 1.025 : 1) : isAdj ? 0.9 : 0.8;
  const opacity = isActive ? 1 : isAdj ? 0.5 : 0.22;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 12 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      aria-hidden={!isActive}
      style={{
        width: cardW, flexShrink: 0, borderRadius: 24,
        padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 2.5vw, 2.25rem)',
        display: 'flex', flexDirection: 'column', gap: '1.4rem',
        userSelect: 'none', position: 'relative', overflow: 'hidden',
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`,
        opacity,
        transition: 'transform 0.38s cubic-bezier(0.23,1,0.32,1), opacity 0.42s ease, box-shadow 0.38s ease',
        willChange: 'transform',
        background: isActive
          ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isActive
          ? '0 20px 70px rgba(0,0,0,0.65), 0 0 80px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.12)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        cursor: isActive ? 'grab' : 'pointer',
      }}
    >
      {/* Top-right shimmer highlight */}
      {isActive && (
        <div aria-hidden style={{
          position: 'absolute', top: -60, right: -60,
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Stars */}
      <ShimmerStars active={isActive} />

      {/* Quote */}
      <p style={{
        margin: 0, flexGrow: 1,
        color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
        fontSize: '1rem', lineHeight: 1.78, fontStyle: 'italic',
        letterSpacing: '0.01em', transition: 'color 0.3s ease',
      }}>
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: isActive
          ? 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.35) 50%, transparent 100%)'
          : 'rgba(255,255,255,0.06)',
        transition: 'background 0.4s ease',
      }} />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #c9a84c, #a0742a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em',
          border: '2px solid rgba(201,168,76,0.35)',
          boxShadow: isActive ? '0 0 22px rgba(201,168,76,0.45)' : 'none',
          transition: 'box-shadow 0.35s ease',
        }}>
          {item.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
            fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em',
            transition: 'color 0.3s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {item.name}
          </div>
          <div style={{
            color: isActive ? 'rgba(201,168,76,0.75)' : 'rgba(201,168,76,0.3)',
            fontSize: '0.78rem', marginTop: 3, letterSpacing: '0.04em',
            transition: 'color 0.3s ease',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(900);
  const [idx, setIdx] = useState(1);       // 1..N are real; 0 and N+1 are clones
  const [transOn, setTransOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const idxRef = useRef(1);

  useEffect(() => { idxRef.current = idx; }, [idx]);

  // Track container width for responsive card sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Responsive card width
  const cardW =
    containerW < 480 ? containerW * 0.83 :
    containerW < 640 ? containerW * 0.75 :
    containerW < 850 ? containerW * 0.62 :
    containerW < 1100 ? containerW * 0.52 :
    Math.min(containerW * 0.46, 660);
  const gap = 28;

  // Center active card inside the container
  const trackTranslate = (i: number) => containerW / 2 - cardW / 2 - i * (cardW + gap);

  // Navigation
  const goTo = useCallback((i: number) => { setTransOn(true); setIdx(i); }, []);
  const goNext = useCallback(() => goTo(idxRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(idxRef.current - 1), [goTo]);

  // After CSS transition: silently snap from ghost clones back to real positions
  const onTxEnd = useCallback(() => {
    const cur = idxRef.current;
    if (cur >= N + 1) { setTransOn(false); setIdx(1); }
    else if (cur <= 0) { setTransOn(false); setIdx(N); }
  }, []);

  // Re-enable transition in next paint after a silent snap
  useEffect(() => {
    if (!transOn) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setTransOn(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [transOn]);

  // Autoplay — pause on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 7000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  // Drag / swipe
  const dragX = useRef<number | null>(null);
  const onDragStart = useCallback((x: number) => { dragX.current = x; }, []);
  const onDragEnd = useCallback((x: number) => {
    if (dragX.current === null) return;
    const delta = x - dragX.current;
    if (Math.abs(delta) > 55) { delta < 0 ? goNext() : goPrev(); }
    dragX.current = null;
  }, [goNext, goPrev]);

  // Real 0-based index for dot indicators
  const realIdx = ((idx - 1) + N) % N;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #07111f 0%, #060d1a 55%, #09141f 100%)', padding: '7rem 0 6rem' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes tStarPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; filter: drop-shadow(0 0 7px rgba(240,208,80,0.95)); }
        }
      `}</style>

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

      {/* Carousel track */}
      <div
        ref={containerRef}
        className="relative z-10"
        style={{ overflow: 'hidden', padding: '16px 0 24px' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div
          style={{
            display: 'flex', gap: `${gap}px`,
            transform: `translateX(${trackTranslate(idx)}px)`,
            transition: transOn ? 'transform 0.68s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            willChange: 'transform', cursor: 'grab',
          }}
          onTransitionEnd={onTxEnd}
          onMouseDown={e => { e.preventDefault(); onDragStart(e.clientX); }}
          onMouseUp={e => onDragEnd(e.clientX)}
          onMouseLeave={e => onDragEnd(e.clientX)}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
        >
          {EXTENDED.map((item, i) => (
            <TestiCard
              key={i}
              item={item}
              isActive={i === idx}
              isAdj={Math.abs(i - idx) === 1}
              cardW={cardW}
            />
          ))}
        </div>
      </div>

      {/* Controls: arrows + dot indicators */}
      <div
        className="relative z-10"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '1.5rem 1rem 0' }}
      >
        <NavArrow dir="prev" onClick={goPrev} />

        <div role="tablist" aria-label="Testimonial slides" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === realIdx}
              aria-label={`Go to slide ${i + 1} of ${N}`}
              onClick={() => goTo(i + 1)}
              style={{
                padding: 0, border: 'none', cursor: 'pointer',
                width: i === realIdx ? 32 : 8, height: 8, borderRadius: 99,
                background: i === realIdx
                  ? 'linear-gradient(90deg, #c9a84c, #f0d080)'
                  : 'rgba(255,255,255,0.18)',
                boxShadow: i === realIdx ? '0 0 16px rgba(201,168,76,0.65)' : 'none',
                transition: 'all 0.42s cubic-bezier(0.23,1,0.32,1)',
              }}
            />
          ))}
        </div>

        <NavArrow dir="next" onClick={goNext} />
      </div>
    </section>
  );
}

    rating: 5,
    project: 'Kitchen Remodeling',
    quote:
      'Sumer Renovations completely transformed our outdated kitchen into a dream space. The attention to detail was incredible, and they stayed on schedule and on budget. We couldn\'t be happier!',
    initials: 'ST',
  },
  {
    name: 'Jennifer Rodriguez',
    location: 'Beaverton, OR',
    rating: 5,
    project: 'Bathroom Renovation',
    quote:
      'They turned our cramped bathroom into a luxurious spa retreat. The tile work is absolutely stunning and the quality is beyond what we expected. Highly recommend!',
    initials: 'JR',
  },
  {
    name: 'David & Lisa Chen',
    location: 'Lake Oswego, OR',
    rating: 5,
    project: 'Full Home Renovation',
    quote:
      'We hired Sumer for a full home renovation and they exceeded every expectation. Professional, clean, punctual, and the results are stunning. Our home looks brand new!',
    initials: 'DC',
  },
  {
    name: 'Mark Williams',
    location: 'Hillsboro, OR',
    rating: 5,
    project: 'Flooring Installation',
    quote:
      'Incredible hardwood floor installation throughout our entire home. The craftsmanship is top-notch and the team was professional and respectful of our space.',
    initials: 'MW',
  },
  {
    name: 'Amanda Foster',
    location: 'Vancouver, WA',
    rating: 5,
    project: 'Exterior Renovation',
    quote:
      'Our home\'s curb appeal is completely transformed. New siding, windows, and a beautiful front door. Neighbors are constantly commenting. Worth every penny!',
    initials: 'AF',
  },
  {
    name: 'Robert & Nancy Park',
    location: 'Wilsonville, OR',
    rating: 5,
    project: 'Custom Deck',
    quote:
      'They built us a gorgeous multi-level deck that has become our favorite room of the house. The quality of materials and craftsmanship is second to none.',
    initials: 'RP',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
            <span className="text-gold-700 text-sm font-medium">Client Testimonials</span>
          </div>
          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
            <SectionAccent variant="blue" />
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <p className="section-subtitle mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what homeowners across Portland and beyond have experienced.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {[
            { value: '5.0', label: 'Average Rating', icon: '⭐' },
            { value: '500+', label: 'Happy Clients', icon: '🏠' },
            { value: '100%', label: 'Recommended', icon: '👍' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-serif text-2xl font-bold text-gold-500">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-gold-100">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-5 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gold-100 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.location} &bull; {testimonial.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
