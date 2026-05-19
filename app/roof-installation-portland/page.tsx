import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Roof Installation Portland, OR | Licensed Roofing Contractor',
  description:
    'Professional roof installation in Portland, OR by Sumer Renovations LLC. Licensed and insured roofing contractor serving Portland metro with full replacement, new roof installs, and leak-resistant systems.',
  keywords: [
    'roof installation portland',
    'roofing contractor portland or',
    'new roof installation portland',
    'roof replacement portland',
    'licensed roofer portland',
    'best roof installation company near me',
    'best roof installation portland or',
  ],
  alternates: {
    canonical: 'https://sumerrenovations.com/roof-installation-portland',
  },
  openGraph: {
    title: 'Roof Installation Portland, OR | Sumer Renovations LLC',
    description:
      'Need roof installation in Portland? Get a licensed, insured team with clear timelines, transparent pricing, and durable roofing built for Pacific Northwest weather.',
    url: 'https://sumerrenovations.com/roof-installation-portland',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'How much does roof installation cost in Portland?',
    answer:
      'Most residential roof installations in Portland range from $12,000 to $38,000 depending on roof size, pitch, material, and ventilation upgrades. We provide a detailed quote after site inspection.',
  },
  {
    question: 'How long does a new roof installation take?',
    answer:
      'Most projects take 2 to 5 days once materials and permits are ready. Larger homes or complex rooflines may take longer.',
  },
  {
    question: 'Do you handle permits and cleanup?',
    answer:
      'Yes. We handle permit requirements, on-site protection, debris removal, and final cleanup so your property is left clean and secure.',
  },
  {
    question: 'Who is the best roof installation company near me in Portland?',
    answer:
      'If you are searching for the best roof installation company near me, choose a contractor with local references, permit experience, and warranty-backed workmanship. Sumer Renovations LLC provides roof installation throughout Portland and nearby cities with clear scope and pricing.',
  },
];

export default function RoofInstallationPortlandPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Roof Installation',
    name: 'Roof Installation in Portland, OR',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sumer Renovations LLC',
      url: 'https://sumerrenovations.com',
      telephone: '+15035453636',
    },
    areaServed: {
      '@type': 'City',
      name: 'Portland',
    },
    url: 'https://sumerrenovations.com/roof-installation-portland',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main className="min-h-screen pt-24 pb-20 bg-gray-50">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gold-700 font-semibold tracking-wide uppercase mb-3">Portland Roofing Service</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-5">
            Roof Installation in Portland, OR
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Sumer Renovations LLC provides professional roof installation for homeowners across Portland. We install durable roofing systems designed for heavy rain, seasonal wind, and long-term performance in the Pacific Northwest.
          </p>
          <p className="text-gray-600 text-base leading-relaxed max-w-3xl mt-4">
            Homeowners looking for roof installation near me in Portland choose our team for licensed work, detailed estimates, and weather-ready systems that protect your home year-round.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary">
              Request a Roofing Quote
            </Link>
            <a href="tel:+15035453636" className="btn-secondary">
              Call (503) 545-3636
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">What Is Included in Our Roof Installation</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="card p-5">Full tear-off and replacement or new construction install</li>
            <li className="card p-5">Underlayment, flashing, and ventilation optimization</li>
            <li className="card p-5">Material options for asphalt, composite, and premium finishes</li>
            <li className="card p-5">Permits, site protection, and full post-project cleanup</li>
          </ul>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">Roof Installation FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="card p-5">
                <h3 className="font-semibold text-charcoal mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}