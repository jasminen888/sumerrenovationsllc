'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

const BEFORE_IMG =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop';
const AFTER_IMG =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(48);
  const dragging = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Trigger intro animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const getPosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      setPosition(getPosition(e.clientX));
    },
    [getPosition]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      setPosition(getPosition(e.touches[0].clientX));
    },
    [getPosition]
  );

  // Release drag if mouse leaves window
  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  return (
    <div className="mb-14">
      {/* Label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.25)' }} />
        <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
          Featured Transformation — Drag to Reveal
        </span>
        <span className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.25)' }} />
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize"
        style={{ height: 440 }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
        aria-label="Before and after kitchen renovation comparison slider"
        role="img"
      >
        {/* BEFORE image (bottom layer, full width) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BEFORE_IMG}')` }}
        />
        {/* BEFORE label */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.55)' }}>
          Before
        </div>

        {/* AFTER image (clipped overlay) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-none"
          style={{
            backgroundImage: `url('${AFTER_IMG}')`,
            clipPath: `inset(0 ${100 - (revealed ? position : 0)}% 0 0)`,
            transition: revealed ? 'none' : 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* AFTER label */}
        <div
          className="absolute top-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #a0742a)',
            left: `calc(${position}% + 20px)`,
            transition: revealed ? 'none' : 'left 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          After
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-0.5 z-20 pointer-events-none"
          style={{
            left: `${revealed ? position : 0}%`,
            background: 'linear-gradient(to bottom, transparent 0%, #c9a84c 20%, white 50%, #c9a84c 80%, transparent 100%)',
            transition: revealed ? 'none' : 'left 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{
            left: `${revealed ? position : 0}%`,
            transition: revealed ? 'none' : 'left 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Circle with arrows */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', border: '2px solid white' }}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M7 1L1 7l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 1l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-white/60 text-xs mt-3 tracking-wide">
        Kitchen Remodel · Portland, OR · Completed 2024
      </p>
    </div>
  );
}
