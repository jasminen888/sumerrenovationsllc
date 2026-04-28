'use client';

export default function MobileActionBar() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 180, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.18)]"
      style={{ background: 'linear-gradient(to right, #0a1628, #0f2136, #0a1628)', borderTop: '1px solid rgba(201,168,76,0.3)' }}
      role="navigation"
      aria-label="Mobile quick actions"
    >
      {/* gold shimmer top edge */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(to right, transparent, #c9a84c 30%, #f5d06f 50%, #c9a84c 70%, transparent)' }} />

      <div className="flex justify-around items-center px-2 py-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>

        {/* Call Us */}
        <a
          href="tel:+19717076604"
          className="flex flex-col items-center gap-1.5 flex-1 group"
          aria-label="Call Sumer Renovations LLC"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-active:scale-95"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(240,230,200,0.85)' }}>Call Us</span>
        </a>

        {/* Get A Quote — gold filled center button */}
        <button
          onClick={scrollToContact}
          className="flex flex-col items-center gap-1.5 flex-1 group"
          aria-label="Get a free quote"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-active:scale-95 shadow-[0_4px_20px_rgba(201,168,76,0.45)]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)' }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[11px] font-bold tracking-wide" style={{ color: '#f5d06f' }}>Get A Quote</span>
        </button>

        {/* Write Us — SMS */}
        <a
          href="sms:+19717076604"
          className="flex flex-col items-center gap-1.5 flex-1 group"
          aria-label="Send a text message to Sumer Renovations LLC"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-active:scale-95"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(240,230,200,0.85)' }}>Write Us</span>
        </a>

      </div>
    </div>
  );
}
