import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Sumer Renovations LLC',
  description: 'Terms of Service for Sumer Renovations LLC — please read before using our services.',
};

export default function TermsPage() {
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

        <h1 className="text-4xl font-black text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: April 28, 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed text-base">
          <p>By using this website, you agree to the following terms.</p>

          <p>
            All content on this site, including text, images, and design, belongs to Sumer Renovations LLC and cannot be copied or reused without permission.
          </p>

          <p>
            Our services are based on agreed project scope, timeline, and pricing. Before any work begins, we will make sure everything is clearly discussed and understood.
          </p>

          <p>
            We ask that you provide accurate information and any materials needed for your project in a timely manner.
          </p>

          <p>
            While we always aim to deliver high-quality work, we are not responsible for any damages or issues that may result from using this website or our services.
          </p>

          <p>
            We may update these terms as needed. By continuing to use the site, you accept any updates.
          </p>

          <p>If you have any questions, feel free to contact us.</p>

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
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="font-medium" style={{ color: '#a0742a' }}>Terms</Link>
          <Link href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</Link>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
        <p className="mt-3">&copy; 2026 Sumer Renovations LLC. All Rights Reserved.</p>
      </div>
    </main>
  );
}
