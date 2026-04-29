import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renovation Blog | Sumer Renovations LLC',
  description:
    'Expert tips, trends, and guides on kitchen remodeling, bathroom renovations, and home improvement projects in Portland, OR.',
  alternates: {
    canonical: 'https://sumerrenovations.com/blog',
  },
};

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Kitchen:    { bg: 'rgba(201,168,76,0.18)',  text: '#f5d06f' },
  Bathroom:   { bg: 'rgba(91,143,212,0.18)',  text: '#93c5fd' },
  Guides:     { bg: 'rgba(107,189,142,0.18)', text: '#6ee7b7' },
  Renovation: { bg: 'rgba(192,132,252,0.18)', text: '#d8b4fe' },
};

export default function BlogListPage() {
  return (
    <>
      <Header />

      <main
        className="min-h-screen pt-20"
        style={{ background: 'linear-gradient(160deg, #060c1c 0%, #0a1628 50%, #0d1f3c 100%)' }}
      >
        {/* Page header */}
        <section className="relative py-20 overflow-hidden">
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', transform: 'translate(-50%,-40%)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#f5d06f' }}>
                Renovation Insights
              </span>
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#c9a84c,#f5d06f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Blog
              </span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
              Tips, trends, and expert guides to help you make the most of your home renovation in Portland.
            </p>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-12 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      quality={85}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(4,13,26,0.7) 100%)' }}
                    />
                    <span
                      className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        background: categoryStyle[post.category]?.bg ?? 'rgba(201,168,76,0.18)',
                        color: categoryStyle[post.category]?.text ?? '#f5d06f',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-serif font-bold text-xl text-white leading-snug mb-3 group-hover:text-gold-300 transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {post.excerpt}
                    </p>

                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase mt-auto w-fit transition-colors duration-200"
                      style={{ color: '#c9a84c' }}
                    >
                      Read Article
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>

                  {/* Gold hover border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.4)' }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
