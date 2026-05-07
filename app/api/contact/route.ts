import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const BUSINESS_EMAIL = 'sumerrenovations@gmail.com';
const FROM_ADDRESS = 'Sumer Renovations LLC <onboarding@resend.dev>';

// ── Rate limiting (in-memory, per IP) ────────────────────────────────────────
// Max 3 submissions per IP per 15 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// ── HTML entity escaping (prevent XSS in email body) ─────────────────────────
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ── Field length limits ───────────────────────────────────────────────────────
const LIMITS: Record<string, number> = {
  fullName: 100,
  email: 254,
  phone: 30,
  service: 80,
  budget: 60,
  contactMethod: 40,
  message: 2000,
};

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit by IP ────────────────────────────────────────────────────
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { fullName, email, phone, service, budget, contactMethod, message, website, _loadedAt } = body;

    // ── Honeypot check ──────────────────────────────────────────────────────
    if (website) {
      // Silently succeed so bots don't know they were caught
      return NextResponse.json({ success: true });
    }

    // ── Timing check (must spend at least 3 s on the page) ─────────────────
    const elapsed = typeof _loadedAt === 'number' ? Date.now() - _loadedAt : Infinity;
    if (elapsed < 3000) {
      return NextResponse.json({ error: 'Submission too fast.' }, { status: 400 });
    }

    // ── Required field check ────────────────────────────────────────────────
    if (!fullName || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // ── Email format validation ─────────────────────────────────────────────
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // ── Field length limits ─────────────────────────────────────────────────
    const fields = { fullName, email, phone, service, budget, contactMethod, message };
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === 'string' && value.length > (LIMITS[key] ?? 500)) {
        return NextResponse.json({ error: `Field "${key}" is too long.` }, { status: 400 });
      }
    }

    // ── Sanitize for email HTML ─────────────────────────────────────────────
    const safe = {
      fullName: esc(String(fullName)),
      email: esc(String(email)),
      phone: esc(String(phone)),
      service: service ? esc(String(service)) : '',
      budget: budget ? esc(String(budget)) : '',
      contactMethod: contactMethod ? esc(String(contactMethod)) : '',
      message: esc(String(message)),
    };

    // ── Business notification email ──────────────────────────────────────────
    const notificationHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:linear-gradient(135deg,#c9a84c,#a0742a);padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;color:#ffffff;font-size:22px">New Quote Request</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Sumer Renovations LLC</p>
        </div>
        <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${safe.fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}" style="color:#c9a84c">${safe.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Phone</td><td style="padding:8px 0"><a href="tel:${safe.phone}" style="color:#c9a84c">${safe.phone}</a></td></tr>
            ${safe.service ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Service</td><td style="padding:8px 0">${safe.service}</td></tr>` : ''}
            ${safe.budget ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Budget</td><td style="padding:8px 0">${safe.budget}</td></tr>` : ''}
            ${safe.contactMethod ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Preferred Contact</td><td style="padding:8px 0">${safe.contactMethod}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:6px;border-left:3px solid #c9a84c">
            <p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Message</p>
            <p style="margin:0;white-space:pre-wrap">${safe.message}</p>
          </div>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;text-align:center">
          <p style="margin:0;font-size:12px;color:#9ca3af">Submitted via sumerrenovationsllc.com</p>
        </div>
      </div>
    `;

    // ── Customer auto-reply email ─────────────────────────────────────────────
    const autoReplyHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:linear-gradient(135deg,#c9a84c,#a0742a);padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;color:#ffffff;font-size:22px">Sumer Renovations LLC</h1>
        </div>
        <div style="background:#ffffff;padding:36px 32px;border:1px solid #e5e7eb;border-top:none">
          <p style="margin:0 0 16px">Hi ${safe.fullName},</p>
          <p style="margin:0 0 16px">Thank you for contacting Sumer Renovations LLC.</p>
          <p style="margin:0 0 32px">We received your message and will get back to you as soon as possible.</p>
          <p style="margin:0">Thank you,<br><strong>Sumer Renovations LLC</strong></p>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;text-align:center">
          <p style="margin:0;font-size:12px;color:#9ca3af">© 2025 Sumer Renovations LLC · Portland, OR</p>
        </div>
      </div>
    `;

    // Send both emails in parallel
    const [notificationResult, autoReplyResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: BUSINESS_EMAIL,
        subject: `New Quote Request from ${safe.fullName}`,
        html: notificationHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: 'Thank you for contacting Sumer Renovations LLC',
        html: autoReplyHtml,
      }),
    ]);

    if (notificationResult.error || autoReplyResult.error) {
      const err = notificationResult.error ?? autoReplyResult.error;
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
