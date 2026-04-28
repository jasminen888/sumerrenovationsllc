'use client';
import { useState, useEffect } from 'react';

export default function FloatingCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="tel:+19717076604"
      aria-label="Call us now"
      className={`md:hidden fixed bottom-6 left-5 z-[150] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-bold text-sm transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white' }}
    >
      {/* Pulsing ring */}
      <span className="relative flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: 'rgba(245,208,111,0.6)' }} />
        <span className="relative inline-flex rounded-full h-5 w-5 items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
          </svg>
        </span>
      </span>
      Call Now
    </a>
  );
}
