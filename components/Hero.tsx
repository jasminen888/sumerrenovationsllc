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
    image: '/kitchen2.jpeg',
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
    image: '/modernhome4.jpeg',
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

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

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
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 8) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (isSwiping.current && Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      dx > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
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
      className="relative w-full aspect-[16/9] min-h-[70vh] sm:min-h-[480px] max-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Slide backgrounds — each wrapped in a consistent 16:9 fill container */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            loading={i === 0 ? undefined : 'lazy'}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px"
            quality={100}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/15" />
      {/* Extra mobile overlay for readability */}
      <div className="absolute inset-0 bg-black/30 sm:hidden" />

      {/* Gold accent line */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gold-gradient rounded-r-full opacity-80" />

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
          <h1 className={`font-serif font-bold leading-tight mb-4 ${
            (slide as typeof slide & { smallHeadline?: boolean }).smallHeadline
              ? 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
              : 'text-3xl sm:text-4xl md:text-5xl xl:text-6xl'
          }`}>
            {highlightedHeadline}
          </h1>

          {/* Description */}
          <p className="hidden md:block text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mt-4 mb-6 max-w-xl font-light hero-item" style={{ animationDelay: '240ms' }}>
            {DESCRIPTION}
          </p>

          {/* Stats bar — only on first slide */}
          {active === 0 && !animating && (
            <div className="hidden md:flex flex-wrap gap-6 mb-10 hero-item" style={{ animationDelay: '360ms' }}>
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
          <div className="hidden sm:flex flex-wrap items-center gap-4 hero-item" style={{ animationDelay: '360ms' }}>
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

      {/* Left arrow — desktop only */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/30 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow — desktop only */}
      <button
        onClick={next}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/30 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Mobile swipe indicator */}
      <div className="sm:hidden absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === active ? 'w-5 h-1.5 bg-gold-400' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Trust bar overlaid at the bottom of the hero */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-20">
        <TrustBar />
      </div>
    </section>
  );
}
