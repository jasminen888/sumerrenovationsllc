import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | Sumer Renovations LLC',
  description: 'A complete overview of all pages and sections on the Sumer Renovations LLC website.',
};


export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="h-2" style={{ background: 'linear-gradient(to right, #a0742a, #c9a84c, #f5d06f, #c9a84c, #a0742a)' }} />

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors" style={{ color: '#a0742a' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-black text-gray-900 mb-3">Sitemap</h1>
        <p className="text-gray-500 mb-12 text-base">Here is a quick overview of all pages on our website.</p>

        <div className="space-y-3">
          {[
            { name: 'Home', href: '/#home' },
            { name: 'Services', href: '/#services' },
            { name: 'Portfolio', href: '/#projects' },
            { name: 'About', href: '/#about' },
            { name: 'Contact', href: '/#contact' },
            { name: 'Schedule Appointment', href: '/#schedule' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/40 transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#c9a84c' }} />
              <span className="font-medium text-gray-800 group-hover:text-yellow-700 transition-colors">{item.name}</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-gray-500 text-base">This page is here to help you find what you need quickly and easily.</p>
      </div>

      {/* Footer strip */}
      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/sitemap" className="font-medium" style={{ color: '#a0742a' }}>Sitemap</Link>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
        <p className="mt-3">&copy; 2026 Sumer Renovations LLC. All Rights Reserved.</p>
      </div>
    </main>
  );
}
