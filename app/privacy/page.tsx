import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Sumer Renovations LLC',
  description: 'Privacy Policy for Sumer Renovations LLC — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="h-2" style={{ background: 'linear-gradient(to right, #a0742a, #c9a84c, #f5d06f, #c9a84c, #a0742a)' }} />

      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors" style={{ color: '#a0742a' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-black text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: April 28, 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed text-base">
          <p>At Sumer Renovations LLC, we take your privacy seriously.</p>

          <p>
            When you visit our website or reach out to us, we may collect basic information such as your name, email, phone number, or details about your project. This helps us respond to you, understand your needs, and provide better service.
          </p>

          <p>
            We may also collect general website data like browser type or how you use our site, just to improve performance and user experience.
          </p>

          <p>
            We do not sell or share your personal information with anyone. The only time your information may be shared is with trusted tools we use to run our business, such as scheduling services or payment providers.
          </p>

          <p>
            We do our best to keep your information secure. That said, no system is 100% secure, so we always recommend being mindful when sharing sensitive information online.
          </p>

          <p>
            If you ever want us to update or delete your information, just reach out and we will take care of it.
          </p>

          <p>We may update this policy from time to time, and any changes will be posted here.</p>

          <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1.5">
            <p className="font-semibold text-gray-800">Sumer Renovations LLC</p>
            <p>Portland, OR</p>
            <p>
              Phone:{' '}
              <a href="tel:+19717076604" className="font-medium" style={{ color: '#a0742a' }}>
                (971) 707-6604
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:sumerrenovations@gmail.com" className="font-medium" style={{ color: '#a0742a' }}>
                sumerrenovations@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="font-medium" style={{ color: '#a0742a' }}>Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</Link>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
        <p className="mt-3">&copy; 2026 Sumer Renovations LLC. All Rights Reserved.</p>
      </div>
    </main>
  );
}
