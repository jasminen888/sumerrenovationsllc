'use client';
import { useEffect, useRef, useState } from 'react';

const badges = [
  {
    name: 'Houzz',
    logo: (
      <svg viewBox="0 0 80 40" className="w-20 h-10" fill="currentColor">
        <text x="4" y="30" fontSize="28" fontFamily="serif" fontWeight="bold">houzz</text>
      </svg>
    ),
    label: 'Best of Houzz'
  },
  {
    name: 'BBB',
    logo: (
      <svg viewBox="0 0 60 40" className="w-16 h-10" fill="currentColor">
        <rect x="2" y="2" width="56" height="36" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="8" y="26" fontSize="20" fontFamily="sans-serif" fontWeight="bold">BBB</text>
      </svg>
    ),
    label: 'A+ Rating'
  },
  {
    name: 'HomeAdvisor',
    logo: (
      <svg viewBox="0 0 120 40" className="w-28 h-10" fill="currentColor">
        <text x="4" y="28" fontSize="18" fontFamily="sans-serif" fontWeight="bold">HomeAdvisor</text>
      </svg>
    ),
    label: 'Top Rated Pro'
  },
  {
    name: 'Angi',
    logo: (
      <svg viewBox="0 0 60 40" className="w-16 h-10" fill="currentColor">
        <text x="4" y="28" fontSize="24" fontFamily="serif" fontWeight="bold">Angi</text>
      </svg>
    ),
    label: 'Super Service Award'
  },
  {
    name: 'GuildQuality',
    logo: (
      <svg viewBox="0 0 120 40" className="w-28 h-10" fill="currentColor">
        <text x="2" y="27" fontSize="16" fontFamily="sans-serif" fontWeight="bold">GuildQuality</text>
      </svg>
    ),
    label: 'Guildmaster Member'
  },
  {
    name: 'NAHB',
    logo: (
      <svg viewBox="0 0 70 40" className="w-16 h-10" fill="currentColor">
        <text x="4" y="28" fontSize="22" fontFamily="sans-serif" fontWeight="bold">NAHB</text>
      </svg>
    ),
    label: 'Member Since 2018'
  },
];

export default function BadgesBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 px-4 bg-white border-y border-gray-100">
      <div
        className="max-w-5xl mx-auto transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
      >
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">
          Trusted & Recognized By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {badges.map((b, i) => (
            <div
              key={b.name}
              className="flex flex-col items-center gap-1.5 group transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-gray-300 group-hover:text-gray-600 transition-colors duration-300">
                {b.logo}
              </div>
              <span className="text-[10px] font-semibold tracking-wide uppercase text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
