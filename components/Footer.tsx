'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

// ─── Wave terrain plexus canvas ───────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const COLS = 32;
    const ROWS = 8;

    type WaveNode = {
      baseX: number;
      x: number;
      y: number;
      radius: number;
      cr: number;
      cg: number;
      cb: number;
      alpha: number;
      row: number;
    };

    let nodes: WaveNode[] = [];

    /** Left = warm gold-orange, right = cool cyan-blue, matches reference image */
    function nodeColor(t: number): { r: number; g: number; b: number } {
      if (t < 0.45) {
        const s = t / 0.45;
        return {
          r: Math.round(230 - 180 * s),
          g: Math.round(150 + 20 * s),
          b: Math.round(50 + 200 * s),
        };
      }
      const s = (t - 0.45) / 0.55;
      return {
        r: Math.round(50 - 30 * s),
        g: Math.round(170 + 40 * s),
        b: 250,
      };
    }

    /** Multiple overlapping sine waves produce natural mountain ridges */
    function waveY(x: number, row: number, w: number, h: number, ph: number): number {
      const rowT = row / (ROWS - 1);
      const baseY = h * 0.18 + rowT * h * 0.72;
      const a1 = h * 0.20;
      const a2 = h * 0.10;
      const a3 = h * 0.05;
      return (
        baseY
        - a1 * Math.sin((x / w) * Math.PI * 2.4 + ph + row * 0.55)
        - a2 * Math.sin((x / w) * Math.PI * 1.1 + ph * 0.65 + row * 0.3)
        - a3 * Math.sin((x / w) * Math.PI * 4.2 + ph * 1.5)
      );
    }

    function buildNodes() {
      nodes = [];
      const w = canvas!.width;
      const h = canvas!.height;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const baseX = (col / (COLS - 1)) * w;
          const c = nodeColor(baseX / w);
          nodes.push({
            baseX,
            x: baseX,
            y: waveY(baseX, row, w, h, 0),
            radius: Math.random() * 1.2 + 1.0,
            cr: c.r,
            cg: c.g,
            cb: c.b,
            alpha: Math.random() * 0.35 + 0.65,
            row,
          });
        }
      }
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      buildNodes();
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      phase += 0.0035;

      const CONNECT = Math.min(w, h) * 0.14;
      const CONNECT_SQ = CONNECT * CONNECT;

      // Recompute Y along the animated wave
      for (const n of nodes) {
        n.y = waveY(n.baseX, n.row, w, h, phase);
      }

      // Connections — opacity fades with distance, color blended between endpoints
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECT_SQ) {
            const alpha = (1 - Math.sqrt(dSq) / CONNECT) * 0.32;
            const mr = Math.round((nodes[i].cr + nodes[j].cr) / 2);
            const mg = Math.round((nodes[i].cg + nodes[j].cg) / 2);
            const mb = Math.round((nodes[i].cb + nodes[j].cb) / 2);
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${mr},${mg},${mb},${alpha})`;
            ctx!.lineWidth = 0.65;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Glowing dot nodes on top
      for (const n of nodes) {
        ctx!.save();
        ctx!.shadowColor = `rgb(${n.cr},${n.cg},${n.cb})`;
        ctx!.shadowBlur = 11;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${n.cr},${n.cg},${n.cb},${n.alpha})`;
        ctx!.fill();
        ctx!.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Service Areas', href: '#service-areas' },
  { name: 'Schedule Appointment', href: '#schedule' },
  { name: 'Contact Us', href: '#contact' },
];

const serviceLinks = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Full Home Renovation',
  'Exterior Renovation',
  'Flooring Installation',
  'Roofing',
  'Painting',
  'Custom Builds',
  'Decks & Outdoor Living',
];

const serviceAreas = [
  'Portland, OR',
  'Beaverton, OR',
  'Hillsboro, OR',
  'Lake Oswego, OR',
  'Wilsonville, OR',
  'Vancouver, WA',
  'Eugene, OR',
  'Corvallis, OR',
];

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 border border-white/20 hover:border-gold-400 hover:bg-gold-500 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [inView, setInView] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative text-white overflow-hidden md:pb-[58px]"
      style={{ background: 'linear-gradient(160deg, #080d1f 0%, #0d1a3a 40%, #120828 100%)' }}
      role="contentinfo"
    >
      {/* Animated particle wave background */}
      <ParticleCanvas />

      {/* Subtle purple/blue vignette overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

      {/* Gold top accent */}
      <div className="relative z-10 h-1 bg-gold-gradient" />

      {/* Main footer */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl font-serif">S</span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg leading-tight text-white">
                  Sumer Renovations
                </div>
                <div className="text-gold-400 text-xs font-medium tracking-widest uppercase">LLC</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Portland&apos;s premier home renovation and remodeling company. We transform houses into
              beautiful, functional dream homes with quality craftsmanship and exceptional service.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialIcon href="https://facebook.com" label="Follow Sumer Renovations on Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Follow Sumer Renovations on Instagram">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={1.5} />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://houzz.com" label="View Sumer Renovations on Houzz">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L20 8v8l-8 4-8-4V8l8-3.764z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://yelp.com" label="Review Sumer Renovations on Yelp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 2C6.702 2 2 6.702 2 12.5S6.702 23 12.5 23 23 18.298 23 12.5 18.298 2 12.5 2zm1.01 15.05l-3.517 1.288c-.4.147-.84-.06-.988-.46L7.5 13.5c-.148-.4.06-.84.46-.988l3.517-1.288c.4-.147.84.06.988.46l1.504 4.378c.148.4-.06.84-.46.988z" />
                </svg>
              </SocialIcon>
            </div>

            {/* QR Code */}
            <div
              className="mt-6 inline-flex flex-col items-center gap-2 p-3 rounded-2xl"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <div className="p-2 rounded-xl bg-white shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                <QRCode
                  value="https://sumerrenovations.com"
                  size={96}
                  fgColor="#040d1a"
                  bgColor="#ffffff"
                  level="H"
                />
              </div>
              <p className="text-[11px] font-medium tracking-wide text-gold-400 uppercase">Scan to visit our site</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2 overflow-hidden">
              <span
                className="h-0.5 bg-gold-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: inView ? '2rem' : '0', transitionDelay: '100ms' }}
              />
              <span
                className="transition-all duration-500 ease-out"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transitionDelay: '180ms' }}
              >
                Quick Links
              </span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li
                  key={link.name}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(-18px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: `${280 + i * 55}ms`,
                  }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-gold-300 transition-colors duration-200 w-full text-left py-0.5"
                  >
                    <svg
                      className="w-3 h-3 text-gold-600 group-hover:text-gold-400 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="relative overflow-hidden">
                      {link.name}
                      <span
                        className="absolute bottom-0 left-0 h-px bg-gold-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2 overflow-hidden">
              <span
                className="h-0.5 bg-gold-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: inView ? '2rem' : '0', transitionDelay: '200ms' }}
              />
              <span
                className="transition-all duration-500 ease-out"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transitionDelay: '280ms' }}
              >
                Our Services
              </span>
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((service, i) => (
                <li
                  key={service}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(-18px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: `${380 + i * 50}ms`,
                  }}
                >
                  <button
                    onClick={() => scrollTo('#services')}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-gold-300 transition-colors duration-200 w-full text-left py-0.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gold-600 group-hover:bg-gold-400 flex-shrink-0 transition-all duration-200 group-hover:scale-150 group-hover:shadow-[0_0_6px_#c9a84c]"
                    />
                    <span className="relative overflow-hidden">
                      {service}
                      <span
                        className="absolute bottom-0 left-0 h-px bg-gold-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact + Service Areas */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2 overflow-hidden">
              <span
                className="h-0.5 bg-gold-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: inView ? '2rem' : '0', transitionDelay: '300ms' }}
              />
              <span
                className="transition-all duration-500 ease-out"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transitionDelay: '380ms' }}
              >
                Contact Us
              </span>
            </h3>
            <div className="space-y-4 mb-8">
              <div
                className="flex items-start gap-3 text-sm group"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-16px)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '480ms' }}
              >
                <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-300 group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+19717076604" className="text-gray-400 hover:text-gold-300 transition-colors font-medium">
                  (971) 707-6604
                </a>
              </div>
              <div
                className="flex items-start gap-3 text-sm group"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-16px)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '560ms' }}
              >
                <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-300 group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sumerrenovations@gmail.com" className="text-gray-400 hover:text-gold-300 transition-colors font-medium">
                  sumerrenovations@gmail.com
                </a>
              </div>
              <div
                className="flex items-start gap-3 text-sm group"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-16px)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '640ms' }}
              >
                <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-300 group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400 leading-relaxed">
                  Mon–Sun: 8:00 AM – 8:00 PM
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-white mb-3 flex items-center gap-2 overflow-hidden">
              <span
                className="h-0.5 bg-gold-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: inView ? '2rem' : '0', transitionDelay: '700ms' }}
              />
              <span
                className="transition-all duration-500 ease-out"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transitionDelay: '760ms' }}
              >
                Service Areas
              </span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {serviceAreas.map((area, i) => (
                <span
                  key={area}
                  className="text-xs text-gray-300 px-2.5 py-1 rounded-full cursor-default hover:text-gold-300 hover:border-gold-500/50 transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'scale(0.8)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.2s, border-color 0.2s, scale 0.2s',
                    transitionDelay: `${820 + i * 45}ms`,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/80 text-sm text-center sm:text-left">
            &copy; 2026 Sumer Home Renovation LLC. All Rights Reserved.
          </p>
          <p className="text-white/70 text-xs text-center">
            Licensed &bull; Bonded &bull; Insured &bull; Portland, OR
          </p>
          <div className="flex gap-4 text-xs text-white/70">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-gold-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Powered by */}
      <div className="relative z-10 border-t border-white/5 py-3 text-center">
        <p className="text-sm text-white/60">
          Powered by{' '}
          <a
            href="https://www.webxdesignstudio.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="webx-brand"
          >
            WebXDesign Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
