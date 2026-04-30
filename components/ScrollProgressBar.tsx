'use client';
import { useEffect, useRef } from 'react';

/**
 * Thin gold progress bar fixed to the very top of the page.
 * Uses a ref + direct style mutation (zero re-renders, no jank).
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'linear-gradient(90deg, #c9a84c 0%, #f5d06f 50%, #e8c050 100%)',
          boxShadow: '0 0 8px rgba(201,168,76,0.75), 0 0 2px rgba(245,208,111,0.5)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
