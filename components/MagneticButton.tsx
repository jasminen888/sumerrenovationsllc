'use client';
import { useRef, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  /** How strongly the element pulls toward the cursor (0–1). Default 0.3 */
  strength?: number;
}

/**
 * Wraps any button/element with a magnetic pull effect —
 * the wrapper translates toward the cursor while hovering,
 * and springs back with a smooth cubic-bezier on leave.
 */
export default function MagneticButton({ children, strength = 0.3 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        display: 'inline-flex',
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {children}
    </span>
  );
}
