'use client';

import { useState } from 'react';

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75V15a.75.75 0 00-.75-.75h-6a.75.75 0 00-.75.75v6.75H3.75A.75.75 0 013 21V9.75z" />
    </svg>
  );
}
function IconKitchen() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 9v12" />
    </svg>
  );
}
function IconBath() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM6 12V7a3 3 0 016 0" />
    </svg>
  );
}
function IconAddition() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function IconInterior() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
    </svg>
  );
}
function IconExterior() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
function IconDeck() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M6 17V9m4 8V9m4 8V9m4 8V9M3 9h18" />
    </svg>
  );
}
function IconRoof() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
    </svg>
  );
}
function IconLandscape() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C8 3 5 6 5 10c0 3 2 5.5 5 6.5V21h4v-4.5c3-1 5-3.5 5-6.5 0-4-3-7-7-7z" />
    </svg>
  );
}
function IconContractor() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-5M16 2l4 4-8 8H8v-4L16 2z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  name: string;
  href: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'full-home',
    label: 'Full Home Renovation',
    icon: <IconHome />,
    color: 'teal',
    items: [
      { name: 'Whole House Remodeling', href: '#services' },
      { name: 'Complete Interior & Exterior', href: '#services' },
      { name: 'Older Home Modernization', href: '#services' },
      { name: 'Fix & Flip Renovation', href: '#services' },
      { name: 'Custom Home Improvement', href: '#services' },
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen Remodeling',
    icon: <IconKitchen />,
    color: 'gold',
    items: [
      { name: 'Custom Kitchen Design', href: '#services' },
      { name: 'Cabinet Installation & Refacing', href: '#services' },
      { name: 'Countertops', href: '#services' },
      { name: 'Backsplash Installation', href: '#services' },
      { name: 'Kitchen Island Installation', href: '#services' },
      { name: 'Lighting & Fixtures', href: '#services' },
    ],
  },
  {
    id: 'bathroom',
    label: 'Bathroom Remodeling',
    icon: <IconBath />,
    color: 'teal',
    items: [
      { name: 'Full Bathroom Renovation', href: '#services' },
      { name: 'Shower & Tub Installation', href: '#services' },
      { name: 'Vanity & Fixtures', href: '#services' },
      { name: 'Tile & Flooring', href: '#services' },
      { name: 'Luxury Bathroom Upgrades', href: '#services' },
    ],
  },
  {
    id: 'additions',
    label: 'Home Additions & ADU',
    icon: <IconAddition />,
    color: 'gold',
    items: [
      { name: 'Room Additions', href: '#services' },
      { name: 'Garage Conversion', href: '#services' },
      { name: 'ADU Construction', href: '#services' },
      { name: 'Second Story Additions', href: '#services' },
      { name: 'Bonus Room Conversion', href: '#services' },
    ],
  },
  {
    id: 'interior',
    label: 'Interior Renovation',
    icon: <IconInterior />,
    color: 'teal',
    items: [
      { name: 'Interior Painting', href: '#services' },
      { name: 'Flooring Installation', href: '#services' },
      { name: 'Drywall & Finishing', href: '#services' },
      { name: 'Trim, Doors & Baseboards', href: '#services' },
      { name: 'Lighting Upgrades', href: '#services' },
      { name: 'Staircase Renovation', href: '#services' },
    ],
  },
  {
    id: 'exterior',
    label: 'Exterior Renovation',
    icon: <IconExterior />,
    color: 'gold',
    items: [
      { name: 'Exterior Painting', href: '#services' },
      { name: 'Siding Installation & Repair', href: '#services' },
      { name: 'Windows & Doors', href: '#services' },
      { name: 'Stucco / Exterior Finish', href: '#services' },
      { name: 'Power Washing', href: '#services' },
      { name: 'Exterior Repairs', href: '#services' },
    ],
  },
  {
    id: 'decks',
    label: 'Decks & Outdoor Living',
    icon: <IconDeck />,
    color: 'teal',
    items: [
      { name: 'Deck Building', href: '#services' },
      { name: 'Deck Replacement', href: '#services' },
      { name: 'Deck Repair & Restoration', href: '#services' },
      { name: 'Patio Renovation', href: '#services' },
      { name: 'Pergolas & Covered Spaces', href: '#services' },
      { name: 'Fencing Installation', href: '#services' },
    ],
  },
  {
    id: 'roofing',
    label: 'Roofing & Gutters',
    icon: <IconRoof />,
    color: 'gold',
    items: [
      { name: 'Roof Replacement', href: '#services' },
      { name: 'Roof Repair', href: '#services' },
      { name: 'Roof Inspection', href: '#services' },
      { name: 'Gutter Installation', href: '#services' },
      { name: 'Gutter Repair', href: '#services' },
    ],
  },
  {
    id: 'landscaping',
    label: 'Landscaping & Outdoor',
    icon: <IconLandscape />,
    color: 'teal',
    items: [
      { name: 'Landscape Design', href: '#services' },
      { name: 'Garden Design', href: '#services' },
      { name: 'Lawn Installation / Sod', href: '#services' },
      { name: 'Irrigation Systems', href: '#services' },
      { name: 'Hardscaping', href: '#services' },
      { name: 'Walkways & Stonework', href: '#services' },
    ],
  },
  {
    id: 'general',
    label: 'General Contractor Services',
    icon: <IconContractor />,
    color: 'gold',
    items: [
      { name: 'Project Management', href: '#services' },
      { name: 'Permits & Planning', href: '#services' },
      { name: 'Structural Work', href: '#services' },
      { name: 'Framing', href: '#services' },
      { name: 'Custom Builds', href: '#services' },
      { name: 'Renovation Consulting', href: '#services' },
    ],
  },
];

// ─── CTA Card ─────────────────────────────────────────────────────────────────

function CTACard({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d4a4a] via-[#0a3a3a] to-[#082e2e] p-6 flex flex-col justify-between h-full min-h-[260px]">
      {/* Decorative gold ring */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border-[20px] border-gold-500/20 pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-[12px] border-gold-400/10 pointer-events-none" />

      <div>
        <div className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-400/30 rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-xs font-medium tracking-wider uppercase">Free Consultation</span>
        </div>
        <h3 className="font-serif text-white text-xl font-bold leading-snug mb-3">
          Need Help Choosing a Service?
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Tell us about your project and we&apos;ll guide you through the best renovation options for your home and budget.
        </p>
      </div>

      <div className="mt-6 space-y-2.5">
        <button
          onClick={() => onNavigate('#contact')}
          className="w-full bg-gold-gradient text-white font-semibold text-sm py-3 px-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Get a Free Quote
        </button>
        <button
          onClick={() => onNavigate('#schedule')}
          className="w-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule Appointment
        </button>
      </div>
    </div>
  );
}

// ─── Desktop Mega Menu ────────────────────────────────────────────────────────

interface MegaMenuProps {
  open: boolean;
  onNavigate: (href: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ open, onNavigate, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Services mega menu"
      className={`absolute top-full left-1/2 -translate-x-1/2 w-[min(96vw,1200px)] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-300 origin-top z-50 ${
        open
          ? 'opacity-100 scale-y-100 translate-y-2 pointer-events-auto'
          : 'opacity-0 scale-y-95 translate-y-0 pointer-events-none'
      }`}
      style={{ transformOrigin: 'top center' }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/80 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0d4a4a]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Our Services</span>
          <span className="text-xs text-gray-400">— Total Home Renovation, Inside &amp; Out</span>
        </div>
        <button
          onClick={() => onNavigate('#services')}
          className="text-xs font-medium text-[#0d4a4a] hover:text-gold-600 flex items-center gap-1 transition-colors"
        >
          View All Services
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="p-6 grid grid-cols-[1fr_1fr_1fr_260px] gap-6">
        {/* Column 1 */}
        <div className="space-y-5">
          {serviceCategories.slice(0, 3).map((cat) => (
            <CategoryColumn key={cat.id} category={cat} onNavigate={onNavigate} />
          ))}
        </div>
        {/* Column 2 */}
        <div className="space-y-5">
          {serviceCategories.slice(3, 6).map((cat) => (
            <CategoryColumn key={cat.id} category={cat} onNavigate={onNavigate} />
          ))}
        </div>
        {/* Column 3 */}
        <div className="space-y-5">
          {serviceCategories.slice(6, 10).map((cat) => (
            <CategoryColumn key={cat.id} category={cat} onNavigate={onNavigate} />
          ))}
        </div>
        {/* CTA column */}
        <div>
          <CTACard onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function CategoryColumn({
  category,
  onNavigate,
}: {
  category: ServiceCategory;
  onNavigate: (href: string) => void;
}) {
  const isTeal = category.color === 'teal';
  const iconBg = isTeal ? 'bg-[#0d4a4a]/10 text-[#0d4a4a]' : 'bg-gold-500/10 text-gold-600';
  const titleColor = isTeal ? 'text-[#0d4a4a]' : 'text-gold-700';
  const hoverColor = isTeal ? 'hover:text-[#0d4a4a]' : 'hover:text-gold-600';
  const dotColor = isTeal ? 'bg-[#0d4a4a]/40 group-hover:bg-[#0d4a4a]' : 'bg-gold-400/60 group-hover:bg-gold-500';

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {category.icon}
        </span>
        <button
          onClick={() => onNavigate('#services')}
          className={`font-semibold text-xs tracking-wide uppercase ${titleColor} hover:opacity-80 transition-opacity`}
        >
          {category.label}
        </button>
      </div>
      <div className="space-y-0.5 pl-9">
        {category.items.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.href)}
            className={`group w-full text-left flex items-center gap-2 text-[13px] text-gray-500 ${hoverColor} hover:bg-gray-50 rounded-lg px-2 py-1 transition-all duration-150`}
          >
            <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150 ${dotColor}`} />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Service Category Accordion ───────────────────────────────────────

interface MobileCategoryProps {
  category: ServiceCategory;
  onNavigate: (href: string) => void;
}

export function MobileCategory({ category, onNavigate }: MobileCategoryProps) {
  const [open, setOpen] = useState(false);
  const isTeal = category.color === 'teal';
  const iconBg = isTeal ? 'bg-[#0d4a4a]/10 text-[#0d4a4a]' : 'bg-gold-500/10 text-gold-600';
  const activeAccent = isTeal ? 'border-[#0d4a4a]/30' : 'border-gold-300';

  return (
    <div className={`rounded-xl border transition-colors duration-200 ${open ? activeAccent : 'border-transparent'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {category.icon}
          </span>
          <span className="font-medium text-charcoal text-sm">{category.label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className={`mx-4 mb-3 pl-4 border-l-2 space-y-0.5 ${isTeal ? 'border-[#0d4a4a]/20' : 'border-gold-200'}`}>
          {category.items.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(item.href)}
              className={`w-full text-left px-3 py-2 text-sm text-gray-600 rounded-lg transition-all ${
                isTeal ? 'hover:text-[#0d4a4a] hover:bg-[#0d4a4a]/5' : 'hover:text-gold-600 hover:bg-gold-50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
