import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Sumer Renovations LLC',
  description: 'Privacy Policy for Sumer Renovations LLC — how we collect, use, and protect your information.',
};

const sections = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'What We Collect',
    body: 'When you visit our website or reach out to us, we may collect basic information such as your name, email, phone number, or details about your project. This helps us respond to you, understand your needs, and provide better service.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Site Analytics',
    body: 'We may also collect general website data like browser type or how you use our site, just to improve performance and user experience.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'We Never Sell Your Data',
    body: 'We do not sell or share your personal information with anyone. The only time your information may be shared is with trusted tools we use to run our business, such as scheduling services or payment providers.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Keeping It Secure',
    body: 'We do our best to keep your information secure. That said, no system is 100% secure, so we always recommend being mindful when sharing sensitive information online.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Your Control',
    body: 'If you ever want us to update or delete your information, just reach out and we will take care of it.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Policy Updates',
    body: 'We may update this policy from time to time, and any changes will be posted here.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: '#f8f7f4' }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 60%, #0f2136 100%)' }}>
        {/* Gold shimmer top bar */}
        <div className="h-1" style={{ background: 'linear-gradient(to right, #a0742a, #c9a84c, #f5d06f, #c9a84c, #a0742a)' }} />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-16">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors" style={{ color: '#c9a84c' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border" style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#c9a84c' }}>
            Legal
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            <span style={{ background: 'linear-gradient(135deg, #f5d06f, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Privacy</span>
            <span className="text-white"> Policy</span>
          </h1>
          <p className="text-white/50 text-sm">Last updated: April 28, 2026</p>
        </div>
      </div>

      {/* Intro card */}
      <div className="max-w-3xl mx-auto px-6 -mt-6 relative z-10">
        <div className="rounded-2xl p-6 shadow-lg border" style={{ background: 'white', borderColor: '#e8e0d0' }}>
          <p className="text-gray-700 leading-relaxed text-base font-medium">
            At Sumer Renovations LLC, we take your privacy seriously. Here's a straightforward overview of how we handle your information.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl p-6 border bg-white hover:shadow-md transition-shadow duration-200" style={{ borderColor: '#ece8df' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #0a1628, #0f2136)' }}>
                <span style={{ color: '#c9a84c' }}>{s.icon}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div className="mt-8 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #0a1628, #0f2136)' }}>
            <h3 className="font-bold text-white text-lg">Get in Touch</h3>
            <p className="text-white/50 text-sm mt-0.5">Have a question about this policy? We're happy to help.</p>
          </div>
          <div className="p-6 bg-white border border-t-0" style={{ borderColor: '#ece8df' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+19717076604" className="flex items-center gap-3 flex-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm group" style={{ borderColor: '#ece8df' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#a0742a' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-sm" style={{ color: '#a0742a' }}>(971) 707-6604</p>
                </div>
              </a>
              <a href="mailto:sumerrenovations@gmail.com" className="flex items-center gap-3 flex-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm group" style={{ borderColor: '#ece8df' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#a0742a' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-semibold text-sm" style={{ color: '#a0742a' }}>sumerrenovations@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t py-6 text-center text-sm text-gray-400" style={{ borderColor: '#ece8df' }}>
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="font-semibold" style={{ color: '#a0742a' }}>Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</Link>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
        <p className="mt-3">&copy; 2026 Sumer Renovations LLC. All Rights Reserved.</p>
      </div>
    </main>
  );
}
