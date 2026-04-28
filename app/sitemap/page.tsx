import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | Sumer Renovations LLC',
  description: 'A complete overview of all pages and sections on the Sumer Renovations LLC website.',
};

const mainSections = [
  { name: 'Home', href: '/#home', description: 'Welcome to Sumer Renovations LLC' },
  { name: 'About Us', href: '/#about', description: 'Our story, mission, and team' },
  { name: 'Services', href: '/#services', description: 'Full scope of renovation services we offer' },
  { name: 'Projects', href: '/#projects', description: 'Browse our completed renovation projects' },
  { name: 'Testimonials', href: '/#testimonials', description: 'Reviews and feedback from our clients' },
  { name: 'Service Areas', href: '/#service-areas', description: 'Cities and regions we serve in Oregon & Washington' },
  { name: 'Schedule Appointment', href: '/#schedule', description: 'Book a free consultation with our team' },
  { name: 'Contact Us', href: '/#contact', description: 'Get in touch for a free quote' },
];

const services = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Full Home Renovation',
  'Exterior Renovation',
  'Flooring Installation',
  'Roofing',
  'Painting',
  'Custom Builds',
  'Decks & Outdoor Living',
];

const serviceAreas = [
  'Portland, OR',
  'Beaverton, OR',
  'Hillsboro, OR',
  'Lake Oswego, OR',
  'Wilsonville, OR',
  'Vancouver, WA',
  'Eugene, OR',
  'Corvallis, OR',
];

const legalPages = [
  { name: 'Privacy Policy', href: '/privacy', description: 'How we collect and use your information' },
  { name: 'Terms of Service', href: '/terms', description: 'Terms governing use of our website and services' },
  { name: 'Sitemap', href: '/sitemap', description: 'This page — an overview of all site content' },
];

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

        <h1 className="text-4xl font-black text-gray-900 mb-2">Sitemap</h1>
        <p className="text-gray-500 mb-14 text-lg">A complete overview of everything on our website.</p>

        <div className="space-y-14">

          {/* Main Sections */}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-5 pb-3 border-b border-gray-100" style={{ color: '#a0742a' }}>
              Main Pages
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {mainSections.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col p-4 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/40 transition-all duration-200"
                >
                  <span className="font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">{item.name}</span>
                  <span className="text-sm text-gray-400 mt-0.5">{item.description}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-5 pb-3 border-b border-gray-100" style={{ color: '#a0742a' }}>
              Our Services
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {services.map((service) => (
                <Link
                  key={service}
                  href="/#services"
                  className="group flex items-center gap-2 p-3.5 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/40 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#c9a84c' }} />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700 transition-colors">{service}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Service Areas */}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-5 pb-3 border-b border-gray-100" style={{ color: '#a0742a' }}>
              Service Areas
            </h2>
            <div className="grid sm:grid-cols-4 gap-3">
              {serviceAreas.map((area) => (
                <Link
                  key={area}
                  href="/#service-areas"
                  className="group flex items-center gap-2 p-3.5 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/40 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#c9a84c' }} />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700 transition-colors">{area}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-5 pb-3 border-b border-gray-100" style={{ color: '#a0742a' }}>
              Legal
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {legalPages.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col p-4 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/40 transition-all duration-200"
                >
                  <span className="font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">{item.name}</span>
                  <span className="text-sm text-gray-400 mt-0.5">{item.description}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 100%)' }}>
            <h2 className="text-xl font-bold text-white mb-2">Ready to Start Your Project?</h2>
            <p className="text-white/60 text-sm mb-6">Get a free estimate from our licensed team today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-full text-sm font-bold text-gray-900 transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #f5d06f)' }}
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+19717076604"
                className="px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 hover:border-yellow-400 transition-all duration-200"
              >
                Call (971) 707-6604
              </a>
            </div>
          </section>
        </div>
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
