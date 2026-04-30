'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

const BEFORE_IMG =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop';
const AFTER_IMG =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const dragging = useRef(false);
  const [sweepStarted, setSweepStarted] = useState(false);
  const [sweepDone, setSweepDone] = useState(false);
  const sweepDoneRef = useRef(false);
  const sweepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-sweep the slider when it scrolls into view, then hand off to the user
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sweepDoneRef.current) {
          observer.disconnect();
          setSweepStarted(true);
          // Two rAFs ensure the first render (clip=100%, transition active) has landed
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setPosition(88);
              const t1 = setTimeout(() => {
                if (sweepDoneRef.current) return;
                setPosition(50);
                const t2 = setTimeout(() => {
                  sweepDoneRef.current = true;
                  setSweepDone(true);
                }, 1150);
                sweepTimers.current.push(t2);
              }, 1300);
              sweepTimers.current.push(t1);
            });
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      sweepTimers.current.forEach(clearTimeout);
    };
  }, [])

  const getPosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    if (!sweepDoneRef.current) {
      sweepDoneRef.current = true;
      setSweepDone(true);
      sweepTimers.current.forEach(clearTimeout);
      sweepTimers.current = [];
    }
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
      if (!sweepDoneRef.current) {
        sweepDoneRef.current = true;
        setSweepDone(true);
        sweepTimers.current.forEach(clearTimeout);
        sweepTimers.current = [];
      }
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
            clipPath: `inset(0 ${sweepStarted ? (100 - position) : 100}% 0 0)`,
            transition: (sweepStarted && !sweepDone) ? 'clip-path 1.1s cubic-bezier(0.20, 1, 0.20, 1)' : 'none',
          }}
        />
        {/* AFTER label */}
        <div
          className="absolute top-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #a0742a)',
            left: `calc(${sweepStarted ? position : 0}% + 20px)`,
            transition: (sweepStarted && !sweepDone) ? 'left 1.1s cubic-bezier(0.20, 1, 0.20, 1)' : 'none',
          }}
        >
          After
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-0.5 z-20 pointer-events-none"
          style={{
            left: `${sweepStarted ? position : 0}%`,
            background: 'linear-gradient(to bottom, transparent 0%, #c9a84c 20%, white 50%, #c9a84c 80%, transparent 100%)',
            transition: (sweepStarted && !sweepDone) ? 'left 1.1s cubic-bezier(0.20, 1, 0.20, 1)' : 'none',
          }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{
            left: `${sweepStarted ? position : 0}%`,
            transition: (sweepStarted && !sweepDone) ? 'left 1.1s cubic-bezier(0.20, 1, 0.20, 1)' : 'none',
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
