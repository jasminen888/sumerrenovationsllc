'use client';
import { useEffect, useRef, useState } from 'react';

const items = [
  {
    label: 'Trusted',
    sub: '500+ Happy Homeowners',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Quality Craftsmanship',
    sub: 'Pro-Grade Materials & Finish',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    label: 'Transparent Pricing',
    sub: 'No Hidden Fees, Ever',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Licensed & Insured',
    sub: 'OR & WA Certified',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
  },
  {
    label: 'Attention to Detail',
    sub: 'Meticulous Every Time',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2136 50%, #0a1628 100%)' }}
    >
      {/* Animated shimmer top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a84c 25%, #f5d06f 50%, #c9a84c 75%, transparent 100%)' }} />

      {/* Subtle background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #f5d06f, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 relative z-10">
        {/* Desktop row */}
        <div className="hidden sm:flex items-center justify-center">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center">
              <div
                className="group flex items-center gap-3.5 px-6 lg:px-8 cursor-default transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  <span style={{ color: '#c9a84c' }}>{item.icon}</span>
                </div>
                {/* Text stack */}
                <div>
                  <div className="text-white font-bold text-base leading-tight whitespace-nowrap tracking-wide">{item.label}</div>
                  <div className="text-xs mt-0.5 whitespace-nowrap" style={{ color: '#c9a84c', opacity: 0.8 }}>{item.sub}</div>
                </div>
              </div>
              {/* Vertical divider */}
              {i < items.length - 1 && (
                <div className="h-10 w-px flex-shrink-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile grid */}
        <div className="sm:hidden grid grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 ${i === items.length - 1 && items.length % 2 !== 0 ? 'col-span-2 justify-center' : ''}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <span style={{ color: '#c9a84c' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>{item.icon.props.children}</svg>
                </span>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">{item.label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#c9a84c', opacity: 0.75 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a84c 25%, #f5d06f 50%, #c9a84c 75%, transparent 100%)' }} />
    </div>
  );
}
