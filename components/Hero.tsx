'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import TrustBar from './TrustBar';

const LABEL = 'REQUEST A FREE CONSULTATION';
const DESCRIPTION =
  'We deliver high-quality kitchen, bathroom, and full home renovations with modern design and expert craftsmanship.';

const slides = [
  {
    id: 1,
    image: '/kitchen1.jpg',
    imageAlt: 'Luxury kitchen renovation with premium finishes and modern design',
    headline: 'Transform Your Home with Expert Renovation',
  },
  {
    id: 2,
    image: '/kitchen.jpg',
    imageAlt: 'Stunning kitchen remodel with modern design and quality craftsmanship',
    headline: 'Stunning Kitchens Designed for Modern Living',
  },
  {
    id: 3,
    image: '/kitchen2.jpg',
    imageAlt: 'Modern kitchen remodel with custom cabinetry and stone countertops',
    headline: 'Beautiful Kitchen Renovations Built to Last',
  },
  {
    id: 4,
    image: '/kitchen3.jpg',
    imageAlt: 'Custom kitchen renovation showcasing expert craftsmanship',
    headline: 'Elegant Kitchen Designs Crafted to Perfection',
  },
  {
    id: 5,
    image: '/kitchen4.jpg',
    imageAlt: 'Luxury custom kitchen with high-end finishes and modern layout',
    headline: 'Luxury Kitchens Built to Impress',
  },
  {
    id: 6,
    image: '/modernhome4.jpg',
    imageAlt: 'Modern home renovation with complete interior transformation',
    headline: 'Complete Home Transformations Done Right',
  },
  {
    id: 7,
    image: '/bathroom.jpg',
    imageAlt: 'Beautiful bathroom renovation with spa-quality finishes',
    headline: 'Beautiful Bathrooms Crafted with Care',
  },
];

const INTERVAL_MS = 5000;

const GOLD_WORDS = new Set(['Transform', 'Modern', 'Beautiful', 'Luxury', 'Complete', 'Elegant', 'Stunning']);

// ─── Connected-dot house animation ───────────────────────────────────────────
// Design space: 300 × 340 coords — scaled to canvas at runtime
const H_NODES: [number, number][] = [
  [150,  72], // 0  roof apex
  [  6, 162], // 1  eave left
  [294, 162], // 2  eave right
  [172,  16], // 3  chimney TL
  [212,  16], // 4  chimney TR
  [172,  72], // 5  chimney BL
  [212,  72], // 6  chimney BR
  [ 28, 162], // 7  wall TL
  [272, 162], // 8  wall TR
  [ 28, 324], // 9  wall BL
  [272, 324], // 10 wall BR
  [122, 238], // 11 door TL
  [178, 238], // 12 door TR
  [122, 324], // 13 door BL
  [178, 324], // 14 door BR
  [150, 232], // 15 door arch top
  [ 48, 188], // 16 lwin TL
  [ 98, 188], // 17 lwin TR
  [ 48, 228], // 18 lwin BL
  [ 98, 228], // 19 lwin BR
  [ 73, 188], // 20 lwin cross-v top
  [ 73, 228], // 21 lwin cross-v bot
  [ 48, 208], // 22 lwin cross-h left
  [ 98, 208], // 23 lwin cross-h right
  [202, 188], // 24 rwin TL
  [252, 188], // 25 rwin TR
  [202, 228], // 26 rwin BL
  [252, 228], // 27 rwin BR
  [227, 188], // 28 rwin cross-v top
  [227, 228], // 29 rwin cross-v bot
  [202, 208], // 30 rwin cross-h left
  [252, 208], // 31 rwin cross-h right
];

const H_EDGES: [number, number][] = [
  [3, 4], [3, 5], [4, 6], [5, 6],                                  // chimney box
  [5, 0], [6, 0],                                                   // chimney → apex
  [0, 1], [0, 2],                                                   // roof slopes
  [1, 7], [2, 8],                                                   // eave → wall corners
  [7, 8], [7, 9], [8, 10], [9, 10],                                 // walls
  [11, 15], [15, 12], [11, 13], [12, 14], [13, 14],                 // door + arch
  [16, 17], [16, 18], [17, 19], [18, 19], [20, 21], [22, 23],       // left window
  [24, 25], [24, 26], [25, 27], [26, 27], [28, 29], [30, 31],       // right window
];

function HouseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let raf: number;
    let t0: number | null = null;
    const CW = canvas.width;
    const CH = canvas.height;
    const sc = Math.min(CW / 300, CH / 340) * 0.84;
    const ox = (CW - 300 * sc) / 2;
    const oy = (CH - 340 * sc) / 2 + 8;

    // Scaled structural node positions
    const S = H_NODES.map(([x, y]) => ({ x: ox + x * sc, y: oy + y * sc }));

    // Floating plexus particles
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; ph: number };
    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: Particle[] = Array.from({ length: 22 }, (_, i) => ({
      x: ox + rng(20, 280) * sc,
      y: oy + rng(10, 320) * sc,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: rng(0.7, 1.6),
      ph: (i / 22) * Math.PI * 2,
    }));

    const CONN = 54 * sc;
    const CONN_SQ = CONN * CONN;
    const ALL_DONE = H_EDGES.length * 55 + 500;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const e = ts - t0;
      ctx.clearRect(0, 0, CW, CH);

      // ── Edges: staggered draw-in ─────────────────────────
      for (let i = 0; i < H_EDGES.length; i++) {
        const [ai, bi] = H_EDGES[i];
        const prog = Math.min(Math.max((e - i * 55) / 380, 0), 1);
        if (prog <= 0) continue;
        const a = S[ai], b = S[bi];
        ctx.save();
        ctx.globalAlpha = Math.min(prog * 2, 1) * 0.55;
        ctx.strokeStyle = '#c9a84c';
        ctx.lineWidth = 0.9;
        ctx.shadowColor = 'rgba(201,168,76,0.75)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * prog, a.y + (b.y - a.y) * prog);
        ctx.stroke();
        ctx.restore();
      }

      // ── Nodes: fade-in + gentle pulse ────────────────────
      for (let i = 0; i < S.length; i++) {
        const fadeIn = Math.min(Math.max((e - i * 35) / 220, 0), 1);
        if (fadeIn <= 0) continue;
        const n = S[i];
        const pulse = 0.65 + 0.35 * Math.sin(e * 0.0019 + i * 0.6);
        const r = (2.0 + 0.8 * pulse) * sc;
        // Outer glow halo
        ctx.save();
        ctx.globalAlpha = fadeIn * 0.22;
        ctx.shadowColor = '#c9a84c';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.12)';
        ctx.fill();
        ctx.restore();
        // Core dot
        ctx.save();
        ctx.globalAlpha = fadeIn * (0.8 + 0.2 * pulse);
        ctx.shadowColor = '#f5e4a8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#f5e4a8';
        ctx.fill();
        ctx.restore();
      }

      // ── Plexus particles: fade in after house finishes ───
      const pFade = Math.min((e - ALL_DONE) / 700, 1);
      if (pFade > 0) {
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 5 || p.x > CW - 5) p.vx *= -1;
          if (p.y < 5 || p.y > CH - 5) p.vy *= -1;
        }
        // Particle → structural node lines
        for (const p of particles) {
          for (const n of S) {
            const dx = p.x - n.x, dy = p.y - n.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < CONN_SQ) {
              ctx.save();
              ctx.globalAlpha = pFade * (1 - Math.sqrt(dSq) / CONN) * 0.18;
              ctx.strokeStyle = '#c9a84c';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
        // Particle → particle lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dSq = dx * dx + dy * dy;
            const lim = CONN_SQ * 0.6;
            if (dSq < lim) {
              ctx.save();
              ctx.globalAlpha = pFade * (1 - Math.sqrt(dSq) / Math.sqrt(lim)) * 0.13;
              ctx.strokeStyle = 'rgba(255,248,220,0.9)';
              ctx.lineWidth = 0.45;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
        // Particle dots
        for (const p of particles) {
          const pulse = 0.55 + 0.45 * Math.sin(e * 0.002 + p.ph);
          ctx.save();
          ctx.globalAlpha = pFade * pulse * 0.78;
          ctx.shadowColor = '#fffde7';
          ctx.shadowBlur = 7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,248,220,0.95)';
          ctx.fill();
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={440}
      aria-hidden="true"
      style={{ opacity: 0.9 }}
    />
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 550);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % slides.length, 'next');
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length, 'prev');
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  const scrollTo = (id: string) => {
    const attempt = () => {
      const el = document.querySelector(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    // Try immediately; if the element isn't mounted yet, retry after a short delay
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      setTimeout(attempt, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const slide = slides[active];

  const highlightedHeadline = slide.headline.split(' ').map((word: string, i: number) => {
    const clean = word.replace(/[^A-Za-z]/g, '');
    const delay = `${80 + i * 80}ms`;
    const isGold = GOLD_WORDS.has(clean);
    return (
      <span key={i} className="headline-word-outer">
        <span
          className={isGold ? 'headline-word-gold' : 'headline-word'}
          style={{ animationDelay: delay }}
        >
          {word}
        </span>
      </span>
    );
  });

  return (
    <section
      id="home"
      className="relative h-[680px] sm:h-[760px] lg:h-[820px] flex items-center justify-center overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/15" />

      {/* Gold accent line */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gold-gradient rounded-r-full opacity-80" />

      {/* Connected-dot house — first slide only, desktop only */}
      {active === 0 && (
        <div
          className={`absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden xl:block transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
        >
          <HouseCanvas />
        </div>
      )}

      {/* Slide content */}
      <div
        key={active}
        className={`relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-white transition-all duration-550 ${
          animating
            ? direction === 'next'
              ? 'opacity-0 translate-x-8'
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
        }`}
        aria-live="polite"
      >
        <div className="max-w-3xl text-center sm:text-left">
          {/* Label badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm hero-badge" style={{ animationDelay: '0ms' }}>
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-300 text-sm font-medium tracking-widest uppercase">
              {LABEL}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`font-serif font-bold leading-snug mb-4 ${
            (slide as typeof slide & { smallHeadline?: boolean }).smallHeadline
              ? 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
              : 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'
          }`}>
            {highlightedHeadline}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mt-4 mb-6 max-w-xl font-light hero-item" style={{ animationDelay: '240ms' }}>
            {DESCRIPTION}
          </p>

          {/* Stats bar — only on first slide */}
          {active === 0 && !animating && (
            <div className="flex flex-wrap gap-6 mb-10 hero-item" style={{ animationDelay: '360ms' }}>
              {[
                { value: '500+', label: 'Projects Completed' },
                { value: '10+', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-gold-400">{stat.value}</span>
                  <span className="text-sm text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 hero-item" style={{ animationDelay: '360ms' }}>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary text-base px-8 py-4 shadow-lg shadow-gold-500/30"
              aria-label="Get a free renovation quote"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get a Free Quote
            </button>
            <button
              onClick={() => scrollTo('#schedule')}
              className="btn-outline border-white/60 text-white hover:bg-white hover:text-charcoal text-base px-8 py-4"
              aria-label="Schedule an appointment"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Trust bar overlaid at the bottom of the hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <TrustBar />
      </div>
    </section>
  );
}
