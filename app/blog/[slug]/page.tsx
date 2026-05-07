import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, getPostBySlug } from '../data';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Sumer Renovations LLC`,
    description: post.excerpt,
    keywords: [
      post.category === 'Kitchen' ? 'kitchen remodeling Portland OR' : '',
      post.category === 'Bathroom' ? 'bathroom renovation Portland OR' : '',
      'home renovation Portland',
      'Sumer Renovations LLC',
      'remodeling contractor Oregon',
    ].filter(Boolean),
    alternates: {
      canonical: `https://sumerrenovations.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Sumer Renovations LLC`,
      description: post.excerpt,
      images: [{ url: post.image, alt: `${post.title} — Sumer Renovations LLC Portland OR` }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Sumer Renovations LLC'],
    },
  };
}

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Kitchen:    { bg: 'rgba(201,168,76,0.18)',  text: '#f5d06f' },
  Bathroom:   { bg: 'rgba(91,143,212,0.18)',  text: '#93c5fd' },
  Guides:     { bg: 'rgba(107,189,142,0.18)', text: '#6ee7b7' },
  Renovation: { bg: 'rgba(192,132,252,0.18)', text: '#d8b4fe' },
};

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://sumerrenovations.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Sumer Renovations LLC',
      url: 'https://sumerrenovations.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sumer Renovations LLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sumerrenovations.com/logo.png',
      },
    },
    url: `https://sumerrenovations.com/blog/${post.slug}`,
    mainEntityOfPage: `https://sumerrenovations.com/blog/${post.slug}`,
    articleSection: post.category,
    wordCount: post.paragraphs.join(' ').split(' ').length,
    keywords: `home renovation Portland, ${post.category.toLowerCase()} remodeling Oregon, Sumer Renovations LLC`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <main
        className="min-h-screen pt-20"
        style={{ background: 'linear-gradient(160deg, #060c1c 0%, #0a1628 50%, #0d1f3c 100%)' }}
      >
        {/* Hero image */}
        <div className="relative w-full" style={{ height: 'clamp(260px, 45vw, 520px)' }}>
          <Image
            src={post.image}
            alt={`${post.title} — Sumer Renovations LLC Portland, OR`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(6,12,28,0.35) 0%, rgba(6,12,28,0.85) 100%)' }}
          />

          {/* Back link */}
          <div className="absolute top-6 left-0 right-0 z-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>

          {/* Overlaid title block */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pb-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <span
                className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{
                  background: categoryStyle[post.category]?.bg ?? 'rgba(201,168,76,0.18)',
                  color: categoryStyle[post.category]?.text ?? '#f5d06f',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {post.category}
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Meta row */}
          <div
            className="flex items-center gap-4 text-sm mb-10 pb-8"
            style={{ color: 'rgba(255,255,255,0.45)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>

          {/* Article paragraphs */}
          <div className="space-y-6">
            {post.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base leading-8"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* CTA block */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#c9a84c' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-white font-medium text-lg mb-6 leading-relaxed max-w-sm mx-auto">
              {post.cta}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #f5d06f)',
                  color: '#040d1a',
                }}
              >
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+19717076604"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (971) 707-6604
              </a>
            </div>
          </div>

          {/* Back to blog link */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
