'use client';
import { useEffect } from 'react';

/**
 * Mounts a single IntersectionObserver that watches every element
 * with class "reveal", "reveal-stagger", "reveal-left", "reveal-right",
 * or "reveal-scale" and adds "in-view" when they enter the viewport.
 *
 * Place this component once in the layout/page tree so it activates globally.
 */
export default function ScrollRevealProvider() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale';

    const observe = () => {
      const elements = document.querySelectorAll(selectors);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return observer;
    };

    // Observe after a short delay to allow first paint
    const timer = setTimeout(() => observe(), 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
