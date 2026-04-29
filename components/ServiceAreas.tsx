'use client';
import SectionAccent from './SectionAccent';

const cities = [
  { name: 'Portland, OR', description: 'Our home base & primary service area' },
  { name: 'Beaverton, OR', description: 'Full renovation services available' },
  { name: 'Hillsboro, OR', description: 'Kitchen, bath & full home remodels' },
  { name: 'Lake Oswego, OR', description: 'Luxury renovation specialists' },
  { name: 'Wilsonville, OR', description: 'Custom renovation & remodeling' },
  { name: 'Vancouver, WA', description: 'Cross-border service, all projects' },
  { name: 'Eugene, OR', description: 'Home renovation & improvement' },
  { name: 'Corvallis, OR', description: 'Remodeling & custom builds' },
];

export default function ServiceAreas() {
  const scrollToSchedule = () => {
    const el = document.querySelector('#schedule');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 180, behavior: 'smooth' });
    }
  };

  return (
    <section id="service-areas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
            <span className="text-gold-700 text-sm font-medium">Service Areas</span>
          </div>
          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
            <SectionAccent />
            <h2 className="section-title">
              Proudly Serving the{' '}
              <span className="text-gold-500">Greater Portland Area</span>
            </h2>
          </div>
          <p className="section-subtitle mx-auto">
            Sumer Renovations LLC provides high-quality home renovation and remodeling services across
            the Portland metro area and surrounding cities.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: City cards */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cities We Serve
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="group flex items-start gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gold-200 hover:bg-gold-50 transition-all duration-200 cursor-default"
                >
                  <div className="mt-0.5 w-8 h-8 bg-gold-100 text-gold-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal text-sm group-hover:text-gold-700 transition-colors">
                      {city.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{city.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability CTA */}
            <div className="mt-8 p-5 bg-charcoal rounded-2xl text-white">
              <p className="text-sm text-gray-300 mb-3">
                Not sure if we serve your area?{' '}
                <span className="text-gold-400 font-medium">Contact us today.</span>
              </p>
              <button
                onClick={scrollToSchedule}
                className="btn-primary w-full justify-center"
                aria-label="Book a free appointment"
              >
                Check Availability
              </button>
            </div>
          </div>

          {/* Right: Google Map */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Our Service Region
            </h3>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <iframe
                src="https://www.google.com/maps?q=Portland,Oregon&output=embed"
                className="w-full h-[450px]"
                loading="lazy"
                title="Sumer Renovations LLC service area map centered on Portland, Oregon"
                aria-label="Google Maps showing our service area around Portland, Oregon"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Serving Portland, OR and surrounding cities within ~100 mile radius
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
