'use client';
import { useEffect, useRef, useState } from 'react';
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
    tags: ['Kitchen', 'Design', 'Trends'],
  },
  {
    slug: 'bathroom-remodel-roi',
    category: 'Bathroom',
    readTime: '6 min read',
    date: 'Apr 28, 2025',
    title: 'What\'s the Real ROI of a Bathroom Remodel in the Portland Metro?',
    excerpt: 'Thinking of remodeling your bathroom before selling? We break down which upgrades consistently return 70–85% of their cost — and which ones buyers in the PNW actually care about.',
    image: '/kitchen2.jpg',
    tags: ['Bathroom', 'ROI', 'Home Value'],
  },
  {
    slug: 'how-to-choose-a-contractor',
    category: 'Guides',
    readTime: '7 min read',
    date: 'Apr 5, 2025',
    title: '7 Red Flags to Watch for When Hiring a Home Renovation Contractor',
    excerpt: 'Before you sign anything, read this. We share the honest warning signs that separate legitimate contractors from those who will leave your project unfinished — based on real stories from Portland homeowners.',
    image: '/kitchen3.jpg',
    tags: ['Hiring', 'Tips', 'Contractor'],
  },
];

const categoryColors: Record<string, string> = {
  Kitchen: '#c9a84c',
  Bathroom: '#5b8fd4',
  Guides: '#6bbd8e',
};

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="blog" ref={ref} className="py-20 px-4 bg-gray-50">
      <div
        className="max-w-6xl mx-auto transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(32px)' }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: '#c9a84c' }}>
              Renovation Insights
            </p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900">
              From Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold flex items-center gap-1.5 group"
            style={{ color: '#c9a84c' }}
          >
            View all posts
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{ background: categoryColors[post.category] ?? '#c9a84c' }}
                >
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg leading-snug mb-3 line-clamp-2 group-hover:text-[#a0742a] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
                  style={{ color: '#c9a84c' }}
                >
                  Read Article
                  <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
