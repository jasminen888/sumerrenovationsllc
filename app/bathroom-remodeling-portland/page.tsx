import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Portland, OR | Bathroom Renovation Contractor',
  description:
    'Bathroom remodeling in Portland, OR by Sumer Renovations LLC. Licensed contractor for full bathroom renovations, shower upgrades, tile work, vanities, and permit-compliant plumbing/electrical updates.',
  keywords: [
    'bathroom remodeling portland',
    'bathroom renovation portland or',
    'bathroom remodel contractor portland',
    'shower remodel portland',
    'bathroom remodel near me portland',
    'best remodeling service near me',
    'best bathroom remodeling company portland or',
  ],
  alternates: {
    canonical: 'https://sumerrenovations.com/bathroom-remodeling-portland',
  },
  openGraph: {
    title: 'Bathroom Remodeling Portland, OR | Sumer Renovations LLC',
    description:
      'Create a modern, functional bathroom with trusted Portland remodeling experts. From design to final fixture install, we handle every detail.',
    url: 'https://sumerrenovations.com/bathroom-remodeling-portland',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'How much does a bathroom remodel cost in Portland?',
    answer:
      'Most Portland bathroom remodeling projects range from $18,000 to $55,000 depending on size, plumbing changes, tile scope, and fixture quality.',
  },
  {
    question: 'How long does a bathroom renovation take?',
    answer:
      'Standard bathroom remodels often take 2 to 5 weeks. Primary suite or full reconfiguration projects can take 5 to 8 weeks.',
  },
  {
    question: 'Do you do custom tile and walk-in showers?',
    answer:
      'Yes. We build custom tile showers, glass enclosures, waterproof systems, heated floors, and premium vanity installations.',
  },
  {
    question: 'Who is the best bathroom remodeling contractor near me in Portland?',
    answer:
      'The best bathroom remodeling contractor near me should provide licensing, references, waterproofing expertise, and transparent pricing. Sumer Renovations LLC serves Portland homeowners with full-scope bathroom upgrades and reliable timelines.',
  },
];

export default function BathroomRemodelingPortlandPage() {
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
    serviceType: 'Bathroom Remodeling',
    name: 'Bathroom Remodeling in Portland, OR',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sumer Renovations LLC',
      url: 'https://sumerrenovations.com',
      telephone: '+19717076604',
    },
    areaServed: {
      '@type': 'City',
      name: 'Portland',
    },
    url: 'https://sumerrenovations.com/bathroom-remodeling-portland',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main className="min-h-screen pt-24 pb-20 bg-gray-50">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gold-700 font-semibold tracking-wide uppercase mb-3">Portland Bathroom Remodeling</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-5">
            Bathroom Remodeling in Portland, OR
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            From practical guest bath updates to luxury primary suite upgrades, Sumer Renovations LLC delivers bathroom remodels that improve comfort, style, and resale value for Portland homeowners.
          </p>
          <p className="text-gray-600 text-base leading-relaxed max-w-3xl mt-4">
            For homeowners searching bathroom remodeling near me, we offer permit-ready planning, tile and shower expertise, and durable finish selections designed for long-term use.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary">
              Request a Bathroom Quote
            </Link>
            <a href="tel:+19717076604" className="btn-secondary">
              Call (971) 707-6604
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">Popular Bathroom Renovation Upgrades</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="card p-5">Custom walk-in shower systems and waterproofing</li>
            <li className="card p-5">Vanity, storage, and countertop modernization</li>
            <li className="card p-5">Tile flooring, wall finishes, and heated floor options</li>
            <li className="card p-5">Lighting, ventilation, and plumbing fixture upgrades</li>
          </ul>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">Bathroom Remodeling FAQ</h2>
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