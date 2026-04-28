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

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>
              Sumer Renovations LLC ("we," "our," or "us") collects information you voluntarily provide when you contact us, request a quote, or use our website. This may include your name, email address, phone number, home address, and details about your renovation project.
            </p>
            <p className="mt-3">
              We also automatically collect certain technical information when you visit our site, including your IP address, browser type, pages visited, and time spent on pages, through standard web analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Respond to your inquiries and provide quotes</li>
              <li>Schedule consultations and project appointments</li>
              <li>Communicate updates about your renovation project</li>
              <li>Send occasional news, offers, or renovation tips (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted subcontractors or service providers who assist us in operating our business, provided they agree to keep your information confidential.
            </p>
            <p className="mt-3">
              We may disclose your information if required by law or to protect the rights, property, or safety of Sumer Renovations LLC, our clients, or others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some portions of our website may not function properly without cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites (such as Calendly or Google Maps). We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal information at any time. To exercise these rights, please contact us at the information below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">8. Changes to This Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1.5">
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
                <a href="mailto:info@sumerrenovations.com" className="font-medium" style={{ color: '#a0742a' }}>
                  info@sumerrenovations.com
                </a>
              </p>
            </div>
          </section>
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
