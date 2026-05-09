import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kitchen Remodeling Portland, OR | Kitchen Renovation Contractor',
  description:
    'Kitchen remodeling in Portland, OR by Sumer Renovations LLC. Licensed general contractor for full kitchen renovation, custom cabinetry, countertops, layout improvements, and permit-ready construction.',
  keywords: [
    'kitchen remodeling portland',
    'kitchen renovation portland or',
    'kitchen remodel contractor portland',
    'custom kitchen remodel portland',
    'kitchen remodel near me portland',
  ],
  alternates: {
    canonical: 'https://sumerrenovations.com/kitchen-remodeling-portland',
  },
  openGraph: {
    title: 'Kitchen Remodeling Portland, OR | Sumer Renovations LLC',
    description:
      'Upgrade your kitchen with custom design and expert craftsmanship. Serving Portland homeowners with full kitchen remodels from concept to final walkthrough.',
    url: 'https://sumerrenovations.com/kitchen-remodeling-portland',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'What is the average kitchen remodeling cost in Portland?',
    answer:
      'Most kitchen remodels in Portland fall between $35,000 and $85,000 based on layout changes, cabinetry scope, appliance level, and finish tier.',
  },
  {
    question: 'How long does a kitchen renovation usually take?',
    answer:
      'A full kitchen remodel typically takes 6 to 10 weeks after planning, selections, and permit approvals are complete.',
  },
  {
    question: 'Can you help with design and permits?',
    answer:
      'Yes. We guide layout decisions, materials, and scope planning, and handle required permits for structural, electrical, and plumbing work.',
  },
];

export default function KitchenRemodelingPortlandPage() {
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
    serviceType: 'Kitchen Remodeling',
    name: 'Kitchen Remodeling in Portland, OR',
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
    url: 'https://sumerrenovations.com/kitchen-remodeling-portland',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main className="min-h-screen pt-24 pb-20 bg-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gold-700 font-semibold tracking-wide uppercase mb-3">Portland Kitchen Remodeling</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-5">
            Kitchen Remodeling in Portland, OR
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            We design and build kitchens that improve flow, function, and long-term value. From cabinetry and countertops to electrical, plumbing, and final finishes, our team handles your remodel from start to finish.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary">
              Get a Kitchen Remodel Quote
            </Link>
            <a href="tel:+19717076604" className="btn-secondary">
              Call (971) 707-6604
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">Our Kitchen Renovation Process</h2>
          <ol className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="card p-5">1. In-home consultation and scope planning</li>
            <li className="card p-5">2. Design selections and budget alignment</li>
            <li className="card p-5">3. Permits, demolition, and build-out execution</li>
            <li className="card p-5">4. Final walkthrough and punch-list completion</li>
          </ol>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="section-title mb-6">Kitchen Remodeling FAQ</h2>
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