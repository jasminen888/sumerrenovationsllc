'use client';
import { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('exitPopupShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem('exitPopupShown', '1');
      }
    };
    // Small delay before listening
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const close = () => setVisible(false);
  const scrollTo = (id: string) => { close(); setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 300); };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2136 100%)', border: '1px solid rgba(201,168,76,0.3)' }}
      >
        {/* Gold top bar */}
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #c9a84c, #f5d06f, #c9a84c)' }} />

        {/* Close */}
        <button onClick={close} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 text-center">
          {!submitted ? (
            <>
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                🏠
              </div>
              <h3 className="text-white font-serif font-bold text-2xl mb-2">Wait — Before You Go!</h3>
              <p className="text-white/60 text-sm mb-1">Get our free guide:</p>
              <p className="font-semibold mb-5" style={{ color: '#f5d06f' }}>"10 Things to Know Before Starting a Kitchen Renovation"</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white' }}
                >
                  Send Me the Free Guide →
                </button>
              </form>

              <p className="text-white/30 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <button onClick={() => scrollTo('#contact')} className="text-sm font-semibold" style={{ color: '#c9a84c' }}>
                  Or get a free quote instead →
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-serif font-bold text-2xl mb-2">You&apos;re all set!</h3>
              <p className="text-white/60 text-sm mb-6">We&apos;ll send the guide to <span style={{ color: '#f5d06f' }}>{email}</span> shortly.</p>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-6 py-3 rounded-full font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white' }}
              >
                Get My Free Quote →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
