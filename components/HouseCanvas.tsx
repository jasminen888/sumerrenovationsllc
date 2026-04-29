'use client';
import { useEffect, useRef } from 'react';

// Design space: 300 × 340 coords — scaled to canvas at runtime
const H_NODES: [number, number][] = [
  [150,  72], // 0  roof apex
  [  6, 162], // 1  eave left
  [294, 162], // 2  eave right
  [172,  16], // 3  chimney TL
  [212,  16], // 4  chimney TR
  [172,  72], // 5  chimney BL
  [212,  72], // 6  chimney BR
  [ 28, 162], // 7  wall TL
  [272, 162], // 8  wall TR
  [ 28, 324], // 9  wall BL
  [272, 324], // 10 wall BR
  [122, 238], // 11 door TL
  [178, 238], // 12 door TR
  [122, 324], // 13 door BL
  [178, 324], // 14 door BR
  [150, 232], // 15 door arch top
  [ 48, 188], // 16 lwin TL
  [ 98, 188], // 17 lwin TR
  [ 48, 228], // 18 lwin BL
  [ 98, 228], // 19 lwin BR
  [ 73, 188], // 20 lwin cross-v top
  [ 73, 228], // 21 lwin cross-v bot
  [ 48, 208], // 22 lwin cross-h left
  [ 98, 208], // 23 lwin cross-h right
  [202, 188], // 24 rwin TL
  [252, 188], // 25 rwin TR
  [202, 228], // 26 rwin BL
  [252, 228], // 27 rwin BR
  [227, 188], // 28 rwin cross-v top
  [227, 228], // 29 rwin cross-v bot
  [202, 208], // 30 rwin cross-h left
  [252, 208], // 31 rwin cross-h right
];

const H_EDGES: [number, number][] = [
  [3, 4], [3, 5], [4, 6], [5, 6],                                  // chimney box
  [5, 0], [6, 0],                                                   // chimney → apex
  [0, 1], [0, 2],                                                   // roof slopes
  [1, 7], [2, 8],                                                   // eave → wall corners
  [7, 8], [7, 9], [8, 10], [9, 10],                                 // walls
  [11, 15], [15, 12], [11, 13], [12, 14], [13, 14],                 // door + arch
  [16, 17], [16, 18], [17, 19], [18, 19], [20, 21], [22, 23],       // left window
  [24, 25], [24, 26], [25, 27], [26, 27], [28, 29], [30, 31],       // right window
];

export default function HouseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let raf: number;
    let t0: number | null = null;
    const CW = canvas.width;
    const CH = canvas.height;
    const sc = Math.min(CW / 300, CH / 340) * 0.84;
    const ox = (CW - 300 * sc) / 2;
    const oy = (CH - 340 * sc) / 2 + 8;

    // Scaled structural node positions
    const S = H_NODES.map(([x, y]) => ({ x: ox + x * sc, y: oy + y * sc }));

    // Floating plexus particles
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; ph: number };
    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: Particle[] = Array.from({ length: 22 }, (_, i) => ({
      x: ox + rng(20, 280) * sc,
      y: oy + rng(10, 320) * sc,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: rng(0.7, 1.6),
      ph: (i / 22) * Math.PI * 2,
    }));

    const CONN = 54 * sc;
    const CONN_SQ = CONN * CONN;
    const ALL_DONE = H_EDGES.length * 55 + 500;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const e = ts - t0;
      ctx.clearRect(0, 0, CW, CH);

      // ── Edges: staggered draw-in ─────────────────────────
      for (let i = 0; i < H_EDGES.length; i++) {
        const [ai, bi] = H_EDGES[i];
        const prog = Math.min(Math.max((e - i * 55) / 380, 0), 1);
        if (prog <= 0) continue;
        const a = S[ai], b = S[bi];
        ctx.save();
        ctx.globalAlpha = Math.min(prog * 2, 1) * 0.55;
        ctx.strokeStyle = '#c9a84c';
        ctx.lineWidth = 0.9;
        ctx.shadowColor = 'rgba(201,168,76,0.75)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * prog, a.y + (b.y - a.y) * prog);
        ctx.stroke();
        ctx.restore();
      }

      // ── Nodes: fade-in + gentle pulse ────────────────────
      for (let i = 0; i < S.length; i++) {
        const fadeIn = Math.min(Math.max((e - i * 35) / 220, 0), 1);
        if (fadeIn <= 0) continue;
        const n = S[i];
        const pulse = 0.65 + 0.35 * Math.sin(e * 0.0019 + i * 0.6);
        const r = (2.0 + 0.8 * pulse) * sc;
        // Outer glow halo
        ctx.save();
        ctx.globalAlpha = fadeIn * 0.22;
        ctx.shadowColor = '#c9a84c';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.12)';
        ctx.fill();
        ctx.restore();
        // Core dot
        ctx.save();
        ctx.globalAlpha = fadeIn * (0.8 + 0.2 * pulse);
        ctx.shadowColor = '#f5e4a8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#f5e4a8';
        ctx.fill();
        ctx.restore();
      }

      // ── Plexus particles: fade in after house finishes ───
      const pFade = Math.min((e - ALL_DONE) / 700, 1);
      if (pFade > 0) {
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 5 || p.x > CW - 5) p.vx *= -1;
          if (p.y < 5 || p.y > CH - 5) p.vy *= -1;
        }
        // Particle → structural node lines
        for (const p of particles) {
          for (const n of S) {
            const dx = p.x - n.x, dy = p.y - n.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < CONN_SQ) {
              ctx.save();
              ctx.globalAlpha = pFade * (1 - Math.sqrt(dSq) / CONN) * 0.18;
              ctx.strokeStyle = '#c9a84c';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
        // Particle → particle lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dSq = dx * dx + dy * dy;
            const lim = CONN_SQ * 0.6;
            if (dSq < lim) {
              ctx.save();
              ctx.globalAlpha = pFade * (1 - Math.sqrt(dSq) / Math.sqrt(lim)) * 0.13;
              ctx.strokeStyle = 'rgba(255,248,220,0.9)';
              ctx.lineWidth = 0.45;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
        // Particle dots
        for (const p of particles) {
          const pulse = 0.55 + 0.45 * Math.sin(e * 0.002 + p.ph);
          ctx.save();
          ctx.globalAlpha = pFade * pulse * 0.78;
          ctx.shadowColor = '#fffde7';
          ctx.shadowBlur = 7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,248,220,0.95)';
          ctx.fill();
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={440}
      aria-hidden="true"
      style={{ opacity: 0.9 }}
    />
  );
}
