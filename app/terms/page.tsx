import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Sumer Renovations LLC',
  description: 'Terms of Service for Sumer Renovations LLC — please read before using our services.',
};

const sections = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Acceptance of Terms',
    body: 'By using this website, you agree to the following terms.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
    title: 'Intellectual Property',
    body: 'All content on this site, including text, images, and design, belongs to Sumer Renovations LLC and cannot be copied or reused without permission.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Our Services',
    body: 'Our services are based on agreed project scope, timeline, and pricing. Before any work begins, we will make sure everything is clearly discussed and understood.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Your Responsibilities',
    body: 'We ask that you provide accurate information and any materials needed for your project in a timely manner.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'Limitation of Liability',
    body: 'While we always aim to deliver high-quality work, we are not responsible for any damages or issues that may result from using this website or our services.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Updates to Terms',
    body: 'We may update these terms as needed. By continuing to use the site, you accept any updates.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20" style={{ background: '#f8f7f4' }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 60%, #0f2136 100%)' }}>
        <div className="h-1" style={{ background: 'linear-gradient(to right, #a0742a, #c9a84c, #f5d06f, #c9a84c, #a0742a)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border" style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#c9a84c' }}>
            Legal
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            <span style={{ background: 'linear-gradient(135deg, #f5d06f, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Terms of</span>
            <span className="text-white"> Service</span>
          </h1>
          <p className="text-white/50 text-sm">Last updated: April 28, 2026</p>
        </div>
      </div>

      {/* Intro card */}
      <div className="max-w-3xl mx-auto px-6 -mt-6 relative z-10">
        <div className="rounded-2xl p-6 shadow-lg border" style={{ background: 'white', borderColor: '#e8e0d0' }}>
          <p className="text-gray-700 leading-relaxed text-base font-medium">
            Please read these terms before using our website or services. By continuing, you agree to the following.
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
            <h3 className="font-bold text-white text-lg">Questions?</h3>
            <p className="text-white/50 text-sm mt-0.5">If you have any questions, feel free to contact us.</p>
          </div>
          <div className="p-6 bg-white border border-t-0" style={{ borderColor: '#ece8df' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+19717076604" className="flex items-center gap-3 flex-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm" style={{ borderColor: '#ece8df' }}>
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
              <a href="mailto:sumerrenovations@gmail.com" className="flex items-center gap-3 flex-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm" style={{ borderColor: '#ece8df' }}>
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

      </main>
      <Footer />
    </>
  );
}
