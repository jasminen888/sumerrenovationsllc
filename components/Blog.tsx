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
    featured: true,
  },
  {
    slug: 'bathroom-remodel-roi',
    category: 'Bathroom',
    readTime: '6 min read',
    date: 'Apr 28, 2025',
    title: "What's the Real ROI of a Bathroom Remodel in the Portland Metro?",
    excerpt: 'Thinking of remodeling your bathroom before selling? We break down which upgrades consistently return 70–85% of their cost.',
    image: '/kitchen2.jpeg',
    featured: false,
  },
  {
    slug: 'how-to-choose-a-contractor',
    category: 'Guides',
    readTime: '7 min read',
    date: 'Apr 5, 2025',
    title: '7 Red Flags to Watch for When Hiring a Home Renovation Contractor',
    excerpt: 'Before you sign anything, read this. We share the honest warning signs that separate legitimate contractors from the rest.',
    image: '/kitchen3.jpg',
    featured: false,
  },
];

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Kitchen:  { bg: 'rgba(201,168,76,0.18)',  text: '#f5d06f' },
  Bathroom: { bg: 'rgba(91,143,212,0.18)',  text: '#93c5fd' },
  Guides:   { bg: 'rgba(107,189,142,0.18)', text: '#6ee7b7' },
};

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

  const featured = posts[0];
  const secondary = posts.slice(1);

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
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 transition-all duration-700"
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
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
          >
            View all posts
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid: 1 featured large + 2 stacked */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured card */}
          <article
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(40px)',
              transitionDelay: '100ms',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Image */}
            <div className="relative h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={90}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,13,26,0.95) 0%, rgba(4,13,26,0.5) 50%, transparent 100%)' }} />

              {/* Category + meta */}
              <div className="absolute top-5 left-5">
                <span
                  className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ background: categoryStyle[featured.category]?.bg ?? 'rgba(201,168,76,0.18)', color: categoryStyle[featured.category]?.text ?? '#f5d06f', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {featured.category}
                </span>
              </div>

              {/* Content inside image */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{featured.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-tight mb-4 group-hover:text-gold-300 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-lg line-clamp-2">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 group/btn"
                  style={{ background: 'linear-gradient(135deg,#c9a84c,#a0742a)', color: '#fff', boxShadow: '0 4px 20px rgba(201,168,76,0.35)' }}
                >
                  Read Article
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          {/* Two stacked secondary cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {secondary.map((post, i) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 transition-all duration-700"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(40px)',
                  transitionDelay: `${220 + i * 120}ms`,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={85}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(4,13,26,0.7) 100%)' }} />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{ background: categoryStyle[post.category]?.bg ?? 'rgba(201,168,76,0.18)', color: categoryStyle[post.category]?.text ?? '#f5d06f', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-white/35 mb-2">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase group/link transition-colors duration-200"
                    style={{ color: '#c9a84c' }}
                  >
                    Read Article
                    <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Gold hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.4)' }} />
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
