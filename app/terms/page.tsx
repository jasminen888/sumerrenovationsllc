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

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website of Sumer Renovations LLC ("Company," "we," "us," or "our") located at sumerrenovations.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Services</h2>
            <p>
              Sumer Renovations LLC is a licensed home renovation and remodeling contractor serving the Portland, Oregon metro area and surrounding regions. Our services include but are not limited to kitchen remodeling, bathroom renovations, home additions, flooring, painting, and general contracting.
            </p>
            <p className="mt-3">
              All project scopes, timelines, costs, and specifications are subject to a written contract signed by both parties before any work commences. Information on this website is for general informational purposes only and does not constitute a binding quote or contract.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Quotes and Estimates</h2>
            <p>
              Any estimates or quotes provided through our website, by phone, or via email are preliminary and subject to change upon on-site assessment. Final pricing will be confirmed in a written contract. We reserve the right to adjust estimates based on additional information, site conditions, or material cost changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Licensing and Insurance</h2>
            <p>
              Sumer Renovations LLC operates as a fully licensed and insured general contractor in the state of Oregon. Copies of our current license and certificate of insurance are available upon request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, graphics, and project photos — is the property of Sumer Renovations LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Sumer Renovations LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on information provided herein. Our total liability for any claim shall not exceed the amount paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Third-Party Services</h2>
            <p>
              Our website may incorporate third-party services such as scheduling tools, mapping services, or analytics platforms. We are not responsible for the terms, privacy practices, or content of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">8. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Use our website for any unlawful purpose</li>
              <li>Transmit spam, malware, or harmful code</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Post false or misleading information</li>
              <li>Infringe on the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">9. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Oregon, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Multnomah County, Oregon.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">10. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time. Updated terms will be posted on this page with a new effective date. Your continued use of our website after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">11. Contact Us</h2>
            <p>For questions about these Terms of Service, please reach out:</p>
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
