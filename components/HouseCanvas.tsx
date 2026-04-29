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
  [3, 4], [3, 5], [4, 6], [5, 6],
  [5, 0], [6, 0],
  [0, 1], [0, 2],
  [1, 7], [2, 8],
  [7, 8], [7, 9], [8, 10], [9, 10],
  [11, 15], [15, 12], [11, 13], [12, 14], [13, 14],
  [16, 17], [16, 18], [17, 19], [18, 19], [20, 21], [22, 23],
  [24, 25], [24, 26], [25, 27], [26, 27], [28, 29], [30, 31],
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

    const S = H_NODES.map(([x, y]) => ({ x: ox + x * sc, y: oy + y * sc }));

    const rng = (a: number, b: number) => a + Math.random() * (b - a);

    // ── Floating plexus particles (50, varied) ──────────────────────────────
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      r: number; ph: number; speed: number; color: string; glow: string;
      trail: { x: number; y: number }[];
    };
    const P_COLORS = ['#f5d06f', '#e8f4ff', '#7eb8f7'];
    const P_GLOWS  = ['#f5d06f', '#c8e6ff', '#4a9eff'];
    const particles: Particle[] = Array.from({ length: 50 }, (_, i) => {
      const speed = rng(0.12, 0.55);
      const angle = rng(0, Math.PI * 2);
      return {
        x: ox + rng(0, 300) * sc,
        y: oy + rng(0, 340) * sc,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rng(0.5, 2.0),
        ph: (i / 50) * Math.PI * 2,
        speed,
        color: P_COLORS[i % 3],
        glow:  P_GLOWS[i % 3],
        trail: [],
      };
    });

    // ── Energy pulses — one per edge, staggered ─────────────────────────────
    type Pulse = { edgeIdx: number; t: number; speed: number; color: string };
    const pulses: Pulse[] = H_EDGES.map((_, i) => ({
      edgeIdx: i,
      t: rng(0, 1),
      speed: rng(0.00045, 0.00085),
      color: (['#f5d06f', '#ffffff', '#7eb8f7', '#4a9eff'] as string[])[Math.floor(Math.random() * 4)],
    }));

    // ── Ripple rings ────────────────────────────────────────────────────────
    type Ripple = { nodeIdx: number; r: number; maxR: number; alpha: number; color: string; glow: string };
    const ripples: Ripple[] = [];
    let nextRippleAt = 800;

    // ── Orbiting sparks (around apex node 0 and chimney apex) ───────────────
    type Spark = { nodeIdx: number; angle: number; orbitR: number; speed: number; r: number; color: string; glow: string };
    const sparks: Spark[] = [
      { nodeIdx: 0,  angle: 0,           orbitR: 18 * sc, speed: 0.0014, r: 1.8, color: '#fffde7', glow: '#f5d06f' },
      { nodeIdx: 0,  angle: Math.PI,     orbitR: 18 * sc, speed: 0.0014, r: 1.2, color: '#7eb8f7', glow: '#4a9eff' },
      { nodeIdx: 15, angle: Math.PI / 2, orbitR: 12 * sc, speed: 0.0022, r: 1.4, color: '#e8f4ff', glow: '#7eb8f7' },
    ];

    const ALL_DONE = H_EDGES.length * 55 + 500;
    const CONN = 60 * sc;
    const CONN_SQ = CONN * CONN;
    const TRAIL_LEN = 8;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const e = ts - t0;
      ctx.clearRect(0, 0, CW, CH);

      const fullyDrawn = e > ALL_DONE;

      // ── 1. Draw edges ────────────────────────────────────────────────────
      for (let i = 0; i < H_EDGES.length; i++) {
        const [ai, bi] = H_EDGES[i];
        const prog = Math.min(Math.max((e - i * 55) / 380, 0), 1);
        if (prog <= 0) continue;
        const a = S[ai], b = S[bi];

        // Breathing glow on completed edges
        const breathe = fullyDrawn ? 0.45 + 0.2 * Math.sin(e * 0.0009 + i * 0.4) : Math.min(prog * 2, 1) * 0.5;

        ctx.save();
        ctx.globalAlpha = breathe;
        ctx.strokeStyle = '#c9a84c';
        ctx.lineWidth = 1.1;
        ctx.shadowColor = 'rgba(201,168,76,0.9)';
        ctx.shadowBlur = fullyDrawn ? 10 : 6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * prog, a.y + (b.y - a.y) * prog);
        ctx.stroke();
        ctx.restore();
      }

      // ── 2. Energy pulses racing along edges ──────────────────────────────
      if (fullyDrawn) {
        for (const pulse of pulses) {
          pulse.t += pulse.speed;
          if (pulse.t > 1) pulse.t -= 1;

          const [ai, bi] = H_EDGES[pulse.edgeIdx];
          const a = S[ai], b = S[bi];
          const px = a.x + (b.x - a.x) * pulse.t;
          const py = a.y + (b.y - a.y) * pulse.t;

          // Comet tail drawn backwards along the edge
          const tailLen = 0.22;
          const t0tail = Math.max(0, pulse.t - tailLen);
          const tx = a.x + (b.x - a.x) * t0tail;
          const ty = a.y + (b.y - a.y) * t0tail;

          const grad = ctx.createLinearGradient(tx, ty, px, py);
          grad.addColorStop(0, 'rgba(245,208,111,0)');
          grad.addColorStop(1, pulse.color === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(245,208,111,0.9)');

          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.0;
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();
          ctx.restore();

          // Leading dot
          ctx.save();
          ctx.globalAlpha = 1;
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 3. Structural nodes ──────────────────────────────────────────────
      for (let i = 0; i < S.length; i++) {
        const fadeIn = Math.min(Math.max((e - i * 35) / 220, 0), 1);
        if (fadeIn <= 0) continue;
        const n = S[i];
        const pulse = 0.6 + 0.4 * Math.sin(e * 0.002 + i * 0.7);
        const r = (2.2 + 1.0 * pulse) * sc;

        // Outer soft halo
        ctx.save();
        ctx.globalAlpha = fadeIn * 0.18;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.15)';
        ctx.shadowColor = '#c9a84c';
        ctx.shadowBlur = 22;
        ctx.fill();
        ctx.restore();

        // Mid ring
        ctx.save();
        ctx.globalAlpha = fadeIn * (0.35 + 0.2 * pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,208,111,0.22)';
        ctx.shadowColor = '#f5d06f';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();

        // Core dot
        ctx.save();
        ctx.globalAlpha = fadeIn * (0.85 + 0.15 * pulse);
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.5, '#f5e4a8');
        coreGrad.addColorStop(1, '#c9a84c');
        ctx.fillStyle = coreGrad;
        ctx.fill();
        ctx.restore();
      }

      // ── 4. Ripple rings ──────────────────────────────────────────────────
      if (fullyDrawn && e > nextRippleAt) {
        const nodeIdx = Math.floor(Math.random() * S.length);
        const RING_PALETTES = [['#f5d06f','#c9a84c'],['#7eb8f7','#4a9eff'],['#e8f4ff','#7eb8f7']];
        const rpc = RING_PALETTES[nodeIdx % 3];
        ripples.push({ nodeIdx, r: 0, maxR: (14 + Math.random() * 18) * sc, alpha: 0.7, color: rpc[0], glow: rpc[1] });
        nextRippleAt = e + rng(600, 1400);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.55;
        rp.alpha *= 0.956;
        if (rp.alpha < 0.015) { ripples.splice(i, 1); continue; }
        const n = S[rp.nodeIdx];
        ctx.save();
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = rp.color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = rp.glow;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── 5. Orbiting sparks ───────────────────────────────────────────────
      if (fullyDrawn) {
        for (const sp of sparks) {
          sp.angle += sp.speed * (e > 0 ? 1 : 0);
          const n = S[sp.nodeIdx];
          const sx = n.x + Math.cos(sp.angle + e * sp.speed) * sp.orbitR;
          const sy = n.y + Math.sin(sp.angle + e * sp.speed) * sp.orbitR * 0.55;
          const sparkAlpha = 0.55 + 0.45 * Math.sin(e * 0.003 + sp.angle);
          ctx.save();
          ctx.globalAlpha = sparkAlpha;
          ctx.shadowColor = sp.glow;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(sx, sy, sp.r, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 6. Plexus particles ──────────────────────────────────────────────
      const pFade = Math.min((e - ALL_DONE) / 600, 1);
      if (pFade > 0) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 2 || p.x > CW - 2) p.vx *= -1;
          if (p.y < 2 || p.y > CH - 2) p.vy *= -1;

          // Trail
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > TRAIL_LEN) p.trail.shift();

          // Draw comet trail for faster particles
          if (p.speed > 0.28 && p.trail.length > 2) {
            for (let ti = 1; ti < p.trail.length; ti++) {
              const ta = p.trail[ti - 1], tb = p.trail[ti];
              const frac = ti / p.trail.length;
              ctx.save();
              ctx.globalAlpha = pFade * frac * 0.35;
              ctx.strokeStyle = p.color;
              ctx.lineWidth = p.r * frac * 0.8;
              ctx.beginPath();
              ctx.moveTo(ta.x, ta.y);
              ctx.lineTo(tb.x, tb.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Particle → node connection lines
        for (const p of particles) {
          for (const n of S) {
            const dx = p.x - n.x, dy = p.y - n.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < CONN_SQ) {
              const frac = 1 - Math.sqrt(dSq) / CONN;
              ctx.save();
              ctx.globalAlpha = pFade * frac * 0.22;
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n.x, n.y);
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
            const lim = CONN_SQ * 0.55;
            if (dSq < lim) {
              ctx.save();
              ctx.globalAlpha = pFade * (1 - Math.sqrt(dSq) / Math.sqrt(lim)) * 0.14;
              ctx.strokeStyle = 'rgba(200,225,255,0.9)';
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Particle dots
        for (const p of particles) {
          const pulse = 0.5 + 0.5 * Math.sin(e * 0.0025 + p.ph);
          ctx.save();
          ctx.globalAlpha = pFade * (0.5 + 0.5 * pulse);
          ctx.shadowColor = p.glow;
          ctx.shadowBlur = p.speed > 0.35 ? 12 : 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (0.7 + 0.3 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
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
      width={420}
      height={480}
      aria-hidden="true"
      style={{ opacity: 0.95 }}
    />
  );
}
