'use client';

import { useEffect } from 'react';

export default function Schedule() {
  useEffect(() => {
    // Dynamically load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="schedule" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
            <span className="text-gold-700 text-sm font-medium">Free Consultation</span>
          </div>
          <h2 className="section-title mb-4">
            Schedule Your{' '}
            <span className="text-gold-500">Free Consultation</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Choose a date and time that works best for you. We&apos;ll review your project and discuss next steps.
          </p>

          <div className="mt-8">
            <a
              href="#schedule"
              onClick={(e) => { e.preventDefault(); document.querySelector('.calendly-inline-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="btn-primary text-base px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Card wrapping Calendly */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Top info bar */}
          <div className="bg-charcoal px-6 py-5 flex flex-wrap gap-6 justify-center sm:justify-start">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: '30-Minute Consultation',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: 'No Obligation',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: 'Phone or Video Call',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: 'Free of Charge',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-gold-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Calendly embed */}
          <div className="p-2 sm:p-4">
            <div
              className="calendly-inline-widget rounded-2xl overflow-hidden"
              data-url="https://calendly.com/sumerrenovations/30min?hide_gdpr_banner=1"
              style={{ minWidth: '320px', height: '900px' }}
              role="region"
              aria-label="Calendly scheduling widget for Sumer Renovations LLC consultation booking"
            />
          </div>

          {/* Trust footer */}
          <div className="px-6 pb-6 flex items-center justify-center gap-2 text-center">
            <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-sm text-gray-500">
              No obligation. Free consultation. We&apos;ll never share your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
