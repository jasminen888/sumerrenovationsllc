'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const serviceItems = [
  { name: 'Full Home Renovation', href: '#services' },
  { name: 'Kitchen Remodeling', href: '#services' },
  { name: 'Bathroom Remodeling', href: '#services' },
  { name: 'Interior Renovation', href: '#services' },
  { name: 'Exterior Renovation', href: '#services' },
  { name: 'Decks & Outdoor Living', href: '#services' },
  { name: 'Roofing & Gutters', href: '#services' },
  { name: 'Landscaping', href: '#services' },
  { name: 'Home Additions & ADU', href: '#services' },
  { name: 'General Contractor Services', href: '#services' },
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
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-black/20 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => navigate('#home')}
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Sumer Renovations LLC — Home"
          >
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg font-serif">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-serif font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
                Sumer Renovations
              </span>
              <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors duration-300 ${scrolled ? 'text-gold-500' : 'text-gold-300'}`}>
                LLC
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className={`group/nav relative px-4 py-2.5 rounded-lg text-base font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                  scrolled
                    ? 'text-charcoal hover:text-gold-600 hover:bg-gold-50/60'
                    : 'text-white/90 hover:text-gold-300 hover:bg-white/10'
                }`}
              >
                <span className="relative">
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover/nav:w-full transition-all duration-300 rounded-full ${
                    scrolled ? 'bg-gold-500' : 'bg-gold-400'
                  }`} />
                </span>
              </button>
            ))}

            {/* Services dropdown trigger */}
            <div className="relative">
              <button
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-semibold tracking-wide transition-all duration-200 ${
                  scrolled
                    ? servicesOpen
                      ? 'text-gold-600 bg-gold-50/60'
                      : 'text-charcoal hover:text-gold-600 hover:bg-gold-50/60'
                    : servicesOpen
                      ? 'text-gold-300 bg-white/10'
                      : 'text-white/90 hover:text-gold-300 hover:bg-white/10'
                }`}
              >
                Services
                <svg className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                  servicesOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="p-2">
                  {serviceItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:text-gold-600 hover:bg-gold-50 transition-all duration-150 group/item"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* ── Right CTA + hamburger ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('#contact')}
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                scrolled
                  ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                  : 'bg-white/15 hover:bg-gold-500 text-white border border-white/30 hover:border-gold-500 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              Get a Free Quote
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                scrolled ? 'text-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
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