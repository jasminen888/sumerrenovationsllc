'use client';
import { useState } from 'react';

const PROJECT_TYPES = [
  { label: 'Kitchen Remodel', icon: '🍳', min: 20000, max: 80000 },
  { label: 'Bathroom Remodel', icon: '🛁', min: 10000, max: 40000 },
  { label: 'Full Home Renovation', icon: '🏠', min: 50000, max: 200000 },
  { label: 'Flooring', icon: '🪵', min: 3000, max: 15000 },
  { label: 'Exterior / Deck', icon: '🌿', min: 8000, max: 40000 },
  { label: 'Custom Project', icon: '🏗️', min: 15000, max: 100000 },
];

const SIZES = [
  { label: 'Small', modifier: 0.7 },
  { label: 'Medium', modifier: 1.0 },
  { label: 'Large', modifier: 1.4 },
];

const FINISHES = [
  { label: 'Standard', modifier: 0.75, desc: 'Quality materials, practical finishes' },
  { label: 'Premium', modifier: 1.0, desc: 'Higher-end materials & design touches' },
  { label: 'Luxury', modifier: 1.35, desc: 'Top-tier materials, custom everything' },
];

function fmt(n: number) {
  return '$' + (Math.round(n / 1000) * 1000).toLocaleString();
}

export default function EstimateCalculator() {
  const [projectIdx, setProjectIdx] = useState<number | null>(null);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [finishIdx, setFinishIdx] = useState(1);
  const [shown, setShown] = useState(false);

  const project = projectIdx !== null ? PROJECT_TYPES[projectIdx] : null;
  const size = SIZES[sizeIdx];
  const finish = FINISHES[finishIdx];

  const low = project ? Math.round(project.min * size.modifier * finish.modifier / 1000) * 1000 : 0;
  const high = project ? Math.round(project.max * size.modifier * finish.modifier / 1000) * 1000 : 0;

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="estimate" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2136 60%, #0a1628 100%)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 border" style={{ background: 'rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: '#f5d06f' }}>Instant Estimate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            What Will Your Renovation <span style={{ color: '#c9a84c' }}>Cost?</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">Select your project type, size, and finish level to get an instant ballpark estimate — no sign-up needed.</p>
        </div>

        <div className="rounded-3xl overflow-hidden border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="p-6 sm:p-8 space-y-8">

            {/* Step 1: Project Type */}
            <div>
              <p className="text-white font-semibold mb-3 text-sm uppercase tracking-widest" style={{ color: '#c9a84c' }}>Step 1 — Project Type</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PROJECT_TYPES.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => { setProjectIdx(i); setShown(false); }}
                    className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border text-center transition-all duration-200"
                    style={{
                      background: projectIdx === i ? 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))' : 'rgba(255,255,255,0.04)',
                      borderColor: projectIdx === i ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                      transform: projectIdx === i ? 'scale(1.03)' : 'scale(1)',
                    }}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs font-semibold" style={{ color: projectIdx === i ? '#f5d06f' : 'rgba(255,255,255,0.7)' }}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size */}
            <div>
              <p className="text-white font-semibold mb-3 text-sm uppercase tracking-widest" style={{ color: '#c9a84c' }}>Step 2 — Project Size</p>
              <div className="flex gap-3">
                {SIZES.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => { setSizeIdx(i); setShown(false); }}
                    className="flex-1 py-3 rounded-xl border text-sm font-semibold transition-all duration-200"
                    style={{
                      background: sizeIdx === i ? 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))' : 'rgba(255,255,255,0.04)',
                      borderColor: sizeIdx === i ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                      color: sizeIdx === i ? '#f5d06f' : 'rgba(255,255,255,0.65)',
                    }}
                  >{s.label}</button>
                ))}
              </div>
            </div>

            {/* Step 3: Finish */}
            <div>
              <p className="text-white font-semibold mb-3 text-sm uppercase tracking-widest" style={{ color: '#c9a84c' }}>Step 3 — Finish Level</p>
              <div className="grid grid-cols-3 gap-3">
                {FINISHES.map((f, i) => (
                  <button
                    key={f.label}
                    onClick={() => { setFinishIdx(i); setShown(false); }}
                    className="py-3 px-2 rounded-xl border text-center transition-all duration-200"
                    style={{
                      background: finishIdx === i ? 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))' : 'rgba(255,255,255,0.04)',
                      borderColor: finishIdx === i ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: finishIdx === i ? '#f5d06f' : 'rgba(255,255,255,0.7)' }}>{f.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <button
              disabled={projectIdx === null}
              onClick={() => setShown(true)}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white', boxShadow: '0 8px 24px rgba(201,168,76,0.35)' }}
            >
              {projectIdx === null ? 'Select a Project Type to Continue' : '💡 Calculate My Estimate'}
            </button>

            {/* Result */}
            {shown && project && (
              <div
                className="rounded-2xl p-6 text-center border animate-fade-in"
                style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.25)' }}
              >
                <p className="text-white/60 text-sm mb-2">Estimated range for your {project.label}</p>
                <p className="font-serif font-bold text-4xl sm:text-5xl mb-1" style={{ color: '#f5d06f' }}>
                  {fmt(low)} – {fmt(high)}
                </p>
                <p className="text-white/40 text-xs mb-5">*Ballpark estimate only. Final cost depends on scope, permits, and site conditions.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="px-6 py-3 rounded-full font-semibold text-sm transition-all"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)', color: 'white' }}
                  >
                    Get an Accurate Quote →
                  </button>
                  <button
                    onClick={() => scrollTo('#schedule')}
                    className="px-6 py-3 rounded-full font-semibold text-sm border transition-all"
                    style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
                  >
                    Book a Free Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
