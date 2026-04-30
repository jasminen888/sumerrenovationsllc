'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
];

const serviceItems = [
  { name: 'Full Home Renovation', href: '/#services', icon: '🏠', desc: 'Complete top-to-bottom transformations' },
  { name: 'Kitchen Remodeling', href: '/#services', icon: '🍳', desc: 'Modern kitchens built to impress' },
  { name: 'Bathroom Remodeling', href: '/#services', icon: '🚿', desc: 'Spa-quality finishes & fixtures' },
  { name: 'Interior Renovation', href: '/#services', icon: '🛋️', desc: 'Open-concept layouts & custom millwork' },
  { name: 'Exterior Renovation', href: '/#services', icon: '🏡', desc: 'Curb appeal that turns heads' },
  { name: 'Decks & Outdoor Living', href: '/#services', icon: '🌿', desc: 'Outdoor spaces for every season' },
  { name: 'Roofing & Gutters', href: '/#services', icon: '🔧', desc: 'Durable protection for your home' },
  { name: 'Landscaping', href: '/#services', icon: '🌳', desc: 'Lush, low-maintenance designs' },
  { name: 'Home Additions & ADU', href: '/#services', icon: '📐', desc: 'Add square footage & value' },
  { name: 'General Contractor Services', href: '/#services', icon: '🏗️', desc: 'Full-service project management' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setServicesOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openServices = useCallback(() => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setServicesOpen(true);
  }, []);

  const closeServicesDelayed = useCallback(() => {
    servicesTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  }, []);

  const navigate = useCallback((href: string) => {
    setServicesOpen(false);
    setMobileOpen(false);
    // Normalize to a plain hash like '#section'
    const hash = href.startsWith('/#') ? href.slice(1) : href.startsWith('#') ? href : null;
    if (hash) {
      if (window.location.pathname === '/') {
        // Already on home page — smooth scroll to section
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        // On a sub-page — navigate to home with the hash
        window.location.href = '/' + hash;
      }
    } else {
      window.location.href = href;
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-sm border-b border-[#e8d9c0]`}
      style={{ background: 'linear-gradient(to right, #fdf6e8, #ffffff, #fdf6e8)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between h-44 relative">

          {/* ── Logo ── */}
          <button
            onClick={() => navigate('#home')}
            className="flex items-center gap-2.5 flex-shrink-0 pb-1"
            aria-label="Sumer Renovations LLC — Home"
          >
            <Image
              src="/sumerrenovations_logo.png"
              alt="Sumer Renovations LLC"
              width={170}
              height={170}
              className="object-contain"
              priority
            />
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5 self-center font-[family-name:var(--font-roboto-serif)]" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="group/nav relative px-5 py-3 rounded-xl text-[18px] font-bold tracking-wide transition-all duration-200 whitespace-nowrap text-gray-800 hover:text-[#c9a84c]"
              >
                <span className="relative z-10">{link.name}</span>
                {/* animated gold underline */}
                <span className="absolute bottom-1.5 left-5 right-5 h-[2px] rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f5d06f] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
                {/* soft hover bg */}
                <span className="absolute inset-0 rounded-xl bg-[#c9a84c]/0 group-hover/nav:bg-[#c9a84c]/8 transition-colors duration-200" />
              </button>
            ))}

            {/* Services mega menu trigger */}
            <div className="relative">
              <button
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`group/svc relative flex items-center gap-1.5 px-5 py-3 rounded-xl text-[18px] font-bold tracking-wide transition-all duration-200 ${
                  servicesOpen ? 'text-[#c9a84c]' : 'text-gray-800 hover:text-[#c9a84c]'
                }`}
              >
                <span className="relative z-10">Services</span>
                <svg className={`w-4 h-4 transition-transform duration-300 relative z-10 ${servicesOpen ? 'rotate-180 text-[#c9a84c]' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-1.5 left-5 right-5 h-[2px] rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f5d06f] transition-transform duration-300 origin-left ${
                  servicesOpen ? 'scale-x-100' : 'scale-x-0 group-hover/svc:scale-x-100'
                }`} />
                <span className={`absolute inset-0 rounded-xl transition-colors duration-200 ${
                  servicesOpen ? 'bg-[#c9a84c]/8' : 'bg-[#c9a84c]/0 group-hover/svc:bg-[#c9a84c]/8'
                }`} />
              </button>

              {/* ── Mega Menu Panel ── */}
              <div
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-gray-100/80 overflow-hidden transition-all duration-250 origin-top z-[60] ${
                  servicesOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-[0.97] -translate-y-2 pointer-events-none'
                }`}
              >
                {/* top gold accent bar */}
                <div className="h-[3px] bg-gradient-to-r from-[#a0742a] via-[#c9a84c] to-[#f5d06f]" />

                <div className="flex">
                  {/* Left: 2-column service grid */}
                  <div className="flex-1 p-4 grid grid-cols-2 gap-1">
                    {serviceItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className="group/item text-left flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-br hover:from-[#c9a84c]/8 hover:to-[#f5d06f]/5 transition-all duration-150 border border-transparent hover:border-[#c9a84c]/20"
                      >
                        <span className="text-xl leading-none mt-0.5 group-hover/item:scale-110 transition-transform duration-150">{item.icon}</span>
                        <span className="flex flex-col">
                          <span className="text-[14.5px] font-bold text-gray-800 group-hover/item:text-[#c9a84c] transition-colors duration-150 leading-tight">{item.name}</span>
                          <span className="text-[12.5px] text-gray-400 mt-0.5 leading-tight">{item.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Right: Feature card */}
                  <div className="w-52 bg-gradient-to-b from-[#0a1628] to-[#0f2136] flex flex-col items-center justify-center p-5 gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a0742a] flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm leading-snug">Free Consultation</p>
                      <p className="text-gray-400 text-[12px] mt-1 leading-snug">Talk to an expert about your project</p>
                    </div>
                    <button
                      onClick={() => navigate('#schedule')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#a0742a] text-white text-[13px] font-bold tracking-wide hover:shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Book Appointment
                    </button>
                    <button
                      onClick={() => navigate('#contact')}
                      className="w-full py-2 rounded-xl border border-white/20 text-white/80 text-[13px] font-semibold hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      Get a Free Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* ── Right CTA + hamburger ── */}
          <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 bottom-4 md:static md:translate-x-0 md:bottom-auto md:self-center">
            {/* Animated running-border CTA */}
            <div className="hidden md:inline-flex relative p-[2px] rounded-xl overflow-hidden shadow-md">
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: '400%',
                  aspectRatio: '1 / 1',
                  top: '50%',
                  left: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0deg, #f5d06f 55deg, #fff8c0 80deg, #c9a84c 105deg, transparent 140deg)',
                  animation: 'borderSpin 1.8s linear infinite',
                }}
              />
              <button
                onClick={() => navigate('#contact')}
                className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px] text-[16px] font-bold tracking-wide transition-all duration-200 bg-gradient-to-r from-[#c9a84c] to-[#a0742a] hover:from-[#a0742a] hover:to-[#c9a84c] text-white hover:shadow-[0_6px_24px_rgba(201,168,76,0.4)] hover:-translate-y-0.5"
              >
                Get a Free Quote
              </button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 text-charcoal hover:bg-gray-100"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileOpen ? 'rotate-45 translate-y-px' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileOpen ? '-rotate-45 -translate-y-px' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Animated gold shimmer line ── */}
      <div
        aria-hidden="true"
        className="relative h-[3px] overflow-hidden"
        style={{ background: 'linear-gradient(to right, #7a5810, #a0742a 20%, #c9a84c 40%, #f5d06f 50%, #c9a84c 60%, #a0742a 80%, #7a5810)' }}
      >
        <div
          className="absolute inset-y-0 w-[30%]"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,252,210,0.9) 50%, transparent)',
            animation: 'goldRun 2s linear infinite',
          }}
        />
      </div>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white overflow-y-auto transition-all duration-300 ${
          mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.href)}
              className="w-full text-left px-4 py-3 rounded-xl text-charcoal hover:text-gold-600 hover:bg-gold-50 font-semibold text-base transition-all"
            >
              {link.name}
            </button>
          ))}

          {/* Services accordion */}
          <div className="pt-1">
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-charcoal hover:text-gold-600 hover:bg-gold-50 font-semibold text-base transition-all"
              aria-expanded={mobileServicesOpen}
            >
              Services
              <svg className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-screen' : 'max-h-0'}`}>
              <div className="pl-4 py-1 space-y-0.5">
                {serviceItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gold-600 hover:bg-gold-50 transition-all"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="pt-4 border-t border-gray-100 pb-6">
            <button
              onClick={() => navigate('#contact')}
              className="w-full btn-primary justify-center py-3.5"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}