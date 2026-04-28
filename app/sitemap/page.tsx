import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | Sumer Renovations LLC',
  description: 'A complete overview of all pages and sections on the Sumer Renovations LLC website.',
};

const pages = [
  {
    name: 'Home',
    href: '/#home',
    desc: 'Welcome & overview of our services',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Services',
    href: '/#services',
    desc: 'Kitchen, bath, flooring, and more',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Portfolio',
    href: '/#projects',
    desc: 'Browse our completed projects',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'About',
    href: '/#about',
    desc: 'Our story, mission, and team',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Contact',
    href: '/#contact',
    desc: 'Get in touch for a free quote',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Schedule Appointment',
    href: '/#schedule',
    desc: 'Book a free consultation',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Privacy Policy',
    href: '/privacy',
    desc: 'How we handle your information',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: 'Terms of Service',
    href: '/terms',
    desc: 'Terms for using our website',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen" style={{ background: '#f8f7f4' }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 60%, #0f2136 100%)' }}>
        <div className="h-1" style={{ background: 'linear-gradient(to right, #a0742a, #c9a84c, #f5d06f, #c9a84c, #a0742a)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-64 rounded-full opacity-10 blur-3xl -translate-x-1/2" style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-16">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors" style={{ color: '#c9a84c' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border" style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#c9a84c' }}>
            Navigation
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            <span style={{ background: 'linear-gradient(135deg, #f5d06f, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Site</span>
            <span className="text-white">map</span>
          </h1>
          <p className="text-white/50 text-base">Here is a quick overview of all pages on our website.</p>
        </div>
      </div>

      {/* Page grid */}
      <div className="max-w-3xl mx-auto px-6 py-12 -mt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {pages.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-4 p-5 rounded-2xl border bg-white hover:shadow-md transition-all duration-200"
              style={{ borderColor: '#ece8df' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200" style={{ background: 'linear-gradient(135deg, #0a1628, #0f2136)' }}>
                <span style={{ color: '#c9a84c' }}>{item.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">{item.name}</p>
                <p className="text-sm text-gray-400 truncate">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 ml-auto flex-shrink-0 text-gray-300 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-400 text-sm">This page is here to help you find what you need quickly and easily.</p>
      </div>

      {/* Footer strip */}
      <div className="border-t py-6 text-center text-sm text-gray-400" style={{ borderColor: '#ece8df' }}>
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/sitemap" className="font-semibold" style={{ color: '#a0742a' }}>Sitemap</Link>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
        <p className="mt-3">&copy; 2026 Sumer Renovations LLC. All Rights Reserved.</p>
      </div>
    </main>
  );
}
