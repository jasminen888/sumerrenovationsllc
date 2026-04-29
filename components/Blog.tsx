'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const posts = [
  {
    slug: 'kitchen-renovation-trends-2026',
    category: 'Kitchen',
    readTime: '5 min read',
    date: 'May 12, 2025',
    title: '10 Kitchen Renovation Trends Dominating Portland Homes in 2026',
    excerpt: 'From waterfall quartz islands to hidden appliance panels, discover the design choices Portland homeowners are loving right now — and which ones offer the best resale value.',
    image: '/kitchen1.jpg',
  },
  {
    slug: 'bathroom-remodel-roi',
    category: 'Bathroom',
    readTime: '6 min read',
    date: 'Apr 28, 2025',
    title: "What's the Real ROI of a Bathroom Remodel in the Portland Metro?",
    excerpt: 'Thinking of remodeling your bathroom before selling? We break down which upgrades consistently return 70–85% of their cost — and which ones buyers in the PNW actually care about.',
    image: '/kitchen2.jpeg',
  },
  {
    slug: 'how-to-choose-a-contractor',
    category: 'Guides',
    readTime: '7 min read',
    date: 'Apr 5, 2025',
    title: '7 Red Flags to Watch for When Hiring a Home Renovation Contractor',
    excerpt: 'Before you sign anything, read this. We share the honest warning signs that separate legitimate contractors from those who will leave your project unfinished.',
    image: '/kitchen3.jpg',
  },
  {
    slug: 'full-home-renovation-guide',
    category: 'Renovation',
    readTime: '8 min read',
    date: 'Mar 18, 2025',
    title: 'The Complete Guide to Planning a Full Home Renovation in Portland',
    excerpt: 'Thinking about a whole-home transformation? This step-by-step guide covers budgeting, permits, timelines, and how to choose the right contractor from day one.',
    image: '/kitchen4.jpg',
  },
];

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Kitchen:    { bg: 'rgba(201,168,76,0.18)',  text: '#f5d06f' },
  Bathroom:   { bg: 'rgba(91,143,212,0.18)',  text: '#93c5fd' },
  Guides:     { bg: 'rgba(107,189,142,0.18)', text: '#6ee7b7' },
  Renovation: { bg: 'rgba(192,132,252,0.18)', text: '#d8b4fe' },
};

function scrollToContact() {
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060c1c 0%, #0a1628 50%, #0d1f3c 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', transform: 'translate(-50%,-40%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', transform: 'translate(40%,40%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          className="mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)' }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase">Renovation Insights</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white leading-tight">
              From Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#c9a84c,#f5d06f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Blog
              </span>
            </h2>
          </div>
        </div>

        {/* Uniform 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transitionDelay: `${100 + i * 100}ms`,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(4,13,26,0.65) 100%)' }} />
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{
                    background: categoryStyle[post.category]?.bg ?? 'rgba(201,168,76,0.18)',
                    color: categoryStyle[post.category]?.text ?? '#f5d06f',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {post.category}
                </span>
              </div>

              {/* Body — flex-grow so all cards stretch to same height */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 text-[11px] text-white/35 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base leading-snug mb-3 line-clamp-2 group-hover:text-gold-300 transition-colors duration-300 flex-shrink-0">
                  {post.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                {/* Button always at bottom */}
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase group/link transition-colors duration-200 mt-auto w-fit"
                  style={{ color: '#c9a84c' }}
                >
                  Read Article
                  <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Gold hover border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.4)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

