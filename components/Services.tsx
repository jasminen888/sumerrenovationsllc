'use client';
import SectionAccent from './SectionAccent';

const services = [
  {
    title: 'Kitchen Remodeling',
    description:
      'Transform your kitchen into a stunning culinary space with custom cabinetry, quartz countertops, and modern fixtures. Our Portland kitchen remodeling team brings decades of craftsmanship to every project — from minor updates to full kitchen renovations.',
    image: '/kitchenremodel.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Bathroom Remodeling',
    description:
      'Create a luxurious spa-like bathroom retreat with custom tile work, walk-in showers, and designer vanities. Whether you\'re in Beaverton or Lake Oswego, our bathroom renovation specialists deliver beautiful, lasting results.',
    image: '/bathroom.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    title: 'Full Home Renovation',
    description:
      'Complete home transformations from top to bottom. We manage every phase of your renovation — design, permits, construction, and finishing — with expert precision. Trusted by homeowners across Portland, Hillsboro, and Eugene.',
    image: '/modernhome1.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Roofing Installation',
    description:
      'Protect your Oregon home with professional roofing installation, repair, and replacement. From Wilsonville to Corvallis, our roofing contractors deliver durable solutions built to handle the Pacific Northwest climate.',
    image: '/roofing.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M4 10v10h6V14h4v6h6V10" />
      </svg>
    ),
  },
  {
    title: 'Deck Installation',
    description:
      'Expand your living space outdoors with a custom deck designed for Oregon\'s lifestyle. From composite decking to natural wood, we build beautiful, weather-resistant decks for homes in Portland, Vancouver WA, and beyond.',
    image: '/deck.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Landscaping Design',
    description:
      'Elevate your home\'s curb appeal with professional landscaping and exterior design. Our landscaping services in Portland and Beaverton include garden design, hardscaping, drainage solutions, and seasonal planting tailored to the Pacific Northwest.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Exterior Renovation',
    description:
      'Boost your home\'s curb appeal with stunning exterior upgrades — new siding, energy-efficient windows, stylish doors, and architectural enhancements. We serve homeowners throughout the Portland metro and Southwest Washington.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Flooring Installation',
    description:
      'Premium hardwood, tile, luxury vinyl, and carpet installation throughout Oregon and SW Washington. Our flooring experts deliver flawless results — from kitchen repairs in Hillsboro to whole-home flooring in Lake Oswego.',
    image: '/floor.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Painting',
    description:
      'Interior and exterior painting services with premium paints and flawless finishes. Our painting crews serve all of Greater Portland — Beaverton, Hillsboro, Vancouver WA, and surrounding areas — with expert color consultation included.',
    image: '/painting.jpg',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

export default function Services() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
            <span className="text-gold-700 text-sm font-medium">Our Services</span>
          </div>
          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
            <SectionAccent variant="blue" />
            <h2 className="section-title">
              Expert Renovation Services
              <br />
              <span className="text-gold-500">Tailored for Your Home</span>
            </h2>
          </div>
          <p className="section-subtitle mx-auto">
            Kitchen remodeling, bathroom renovation, roofing installation, deck building, landscaping design, and full home renovation — all under one roof. Serving Portland, Beaverton, Hillsboro, Lake Oswego, Vancouver WA, Eugene, Corvallis, and Wilsonville.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="card group cursor-pointer overflow-hidden"
              onClick={() => scrollTo('#contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollTo('#contact')}
              aria-label={`Learn more about ${service.title}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                  role="img"
                  aria-label={`${service.title} by Sumer Renovations LLC in Portland, OR`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-charcoal text-sm font-semibold px-4 py-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Service →
                  </span>
                </div>
                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2 group-hover:text-gold-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center gap-1 text-gold-500 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Don&apos;t see what you&apos;re looking for? We handle custom projects too.</p>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 180;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="btn-primary"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
