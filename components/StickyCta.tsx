'use client';

export default function StickyCta() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[55] hidden md:flex items-center justify-between"
      style={{
        background: 'linear-gradient(90deg, #0a1628 0%, #0f2136 50%, #0a1628 100%)',
        borderTop: '1px solid rgba(201,168,76,0.4)',
        height: 58,
        paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
      }}
      role="complementary"
      aria-label="Call to action bar"
    >
      {/* Left: brand tagline */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        <span className="text-white/80 text-sm font-medium hidden lg:inline">
          Portland&apos;s Trusted Renovation Experts &mdash;
        </span>
        <a
          href="tel:+19717076604"
          className="flex items-center gap-2 text-white text-sm font-semibold hover:text-gold-300 transition-colors"
          aria-label="Call us"
        >
          <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          (971) 707-6604
        </a>
      </div>

      {/* Center: trust badges */}
      <div className="hidden lg:flex items-center gap-6 text-white/50 text-xs font-medium tracking-wide">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Licensed &amp; Bonded
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          5-Star Rated
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          500+ Projects
        </span>
      </div>

      {/* Right: CTA button */}
      <button
        onClick={scrollToContact}
        className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #c9a84c, #a0742a)',
          boxShadow: '0 4px 0 #7a5c18',
        }}
        aria-label="Get a free quote"
      >
        Get a Free Quote
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
