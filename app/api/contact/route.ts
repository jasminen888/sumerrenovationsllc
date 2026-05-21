import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

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

    // ── Timestamp ───────────────────────────────────────────────────────────
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    // ── Admin notification email ─────────────────────────────────────────────
    const notificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Client Inquiry — Sumer Renovations LLC</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;">

        <!-- Header -->
        <tr>
          <td style="background:#111111;border-radius:12px 12px 0 0;padding:36px 40px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#c9a84c;">Sumer Renovations LLC</p>
                  <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">New Client Inquiry</h1>
                </td>
                <td align="right" valign="middle">
                  <div style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#a07030);border-radius:50%;width:48px;height:48px;text-align:center;line-height:48px;">
                    <span style="font-size:22px;color:#111111;">✉</span>
                  </div>
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;height:2px;background:linear-gradient(90deg,#c9a84c,#a07030,transparent);border-radius:2px;"></div>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a1a,#2a2a2a);padding:16px 40px;">
            <p style="margin:0;font-size:13px;color:#c9a84c;font-weight:600;">
              &#9679;&nbsp; New inquiry received from <strong style="color:#ffffff;">${safe.fullName}</strong>
            </p>
          </td>
        </tr>

        <!-- Client Details Card -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px 28px;">
            <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;">Client Details</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;width:160px;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Name</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:15px;font-weight:600;color:#111111;">${safe.fullName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Email</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <a href="mailto:${safe.email}" style="font-size:15px;color:#c9a84c;text-decoration:none;font-weight:500;">${safe.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Phone</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <a href="tel:${safe.phone}" style="font-size:15px;color:#c9a84c;text-decoration:none;font-weight:500;">${safe.phone}</a>
                </td>
              </tr>
              ${safe.service ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Service</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="display:inline-block;background:#111111;color:#c9a84c;font-size:13px;font-weight:600;padding:4px 12px;border-radius:4px;letter-spacing:0.04em;">${safe.service}</span>
                </td>
              </tr>` : ''}
              ${safe.budget ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Budget</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:15px;font-weight:600;color:#111111;">${safe.budget}</span>
                </td>
              </tr>` : ''}
              ${safe.contactMethod ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Preferred Contact</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                  <span style="font-size:15px;color:#111111;">${safe.contactMethod}</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:12px 0;vertical-align:top;">
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Submitted</span>
                </td>
                <td style="padding:12px 0;vertical-align:top;">
                  <span style="font-size:13px;color:#6b7280;">${timestamp}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message Block -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 36px;">
            <div style="border-top:2px solid #f3f4f6;padding-top:24px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;">Client Message</p>
              <div style="background:#f9fafb;border-left:3px solid #c9a84c;border-radius:0 8px 8px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap;">${safe.message}</p>
              </div>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="background:#fafafa;border-top:1px solid #f3f4f6;padding:28px 40px;text-align:center;">
            <a href="mailto:${safe.email}?subject=Re%3A%20Your%20Renovation%20Inquiry%20%E2%80%94%20Sumer%20Renovations%20LLC"
               style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#a07030);color:#111111;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:6px;">
              Reply to ${safe.fullName}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111111;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#c9a84c;">Sumer Renovations LLC</p>
            <p style="margin:0;font-size:12px;color:#6b7280;">Portland, OR &nbsp;·&nbsp; (503) 545-3636 &nbsp;·&nbsp; sumerrenovationsllc.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
    `;

    // ── Client confirmation email ─────────────────────────────────────────────
    const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Thank You for Contacting Sumer Renovations LLC</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;">

        <!-- Brand Header -->
        <tr>
          <td style="background:#111111;border-radius:12px 12px 0 0;padding:44px 40px 40px;text-align:center;">
            <!-- Gold rule top -->
            <div style="height:3px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);border-radius:2px;margin-bottom:32px;"></div>
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#c9a84c;">Luxury Home Renovations</p>
            <h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">Sumer Renovations LLC</h1>
            <p style="margin:8px 0 0;font-size:13px;color:#6b7280;letter-spacing:0.06em;">Portland, Oregon</p>
            <!-- Gold rule bottom -->
            <div style="height:1px;background:linear-gradient(90deg,transparent,#c9a84c 40%,#c9a84c 60%,transparent);border-radius:2px;margin-top:28px;"></div>
          </td>
        </tr>

        <!-- Hero Message -->
        <tr>
          <td style="background:#1a1a1a;padding:40px 40px 36px;text-align:center;">
            <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#c9a84c;">Thank You</p>
            <h2 style="margin:0 0 20px;font-size:22px;font-weight:600;color:#ffffff;line-height:1.35;">We have received your inquiry,<br />${safe.fullName}.</h2>
            <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.75;max-width:460px;margin-left:auto;margin-right:auto;">
              Thank you for contacting Sumer Renovations LLC. We truly appreciate the opportunity to connect with you regarding your renovation project. Our team will review your request and follow up with you shortly.
            </p>
          </td>
        </tr>

        <!-- Divider with icon -->
        <tr>
          <td style="background:#1a1a1a;padding:0 40px 36px;text-align:center;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,#333333,transparent);"></div>
          </td>
        </tr>

        <!-- Inquiry Summary Card -->
        <tr>
          <td style="background:#1a1a1a;padding:0 40px 40px;">
            <div style="background:#111111;border:1px solid #2a2a2a;border-top:2px solid #c9a84c;border-radius:8px;overflow:hidden;">
              <div style="padding:20px 28px 16px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#c9a84c;">Inquiry Summary</p>
              </div>
              <div style="height:1px;background:#1e1e1e;"></div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:4px 0;">
                <tr>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;width:160px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Name</span>
                  </td>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:14px;color:#ffffff;font-weight:500;">${safe.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Email</span>
                  </td>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:14px;color:#c9a84c;">${safe.email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Phone</span>
                  </td>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:14px;color:#ffffff;">${safe.phone}</span>
                  </td>
                </tr>
                ${safe.service ? `
                <tr>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Project / Service</span>
                  </td>
                  <td style="padding:14px 28px;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="display:inline-block;background:#1a1a1a;border:1px solid #c9a84c;color:#c9a84c;font-size:12px;font-weight:600;padding:3px 10px;border-radius:4px;">${safe.service}</span>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:14px 28px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Message</span>
                  </td>
                  <td style="padding:14px 28px;vertical-align:top;">
                    <span style="font-size:14px;color:#d1d5db;line-height:1.6;white-space:pre-wrap;">${safe.message}</span>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Warm sign-off -->
        <tr>
          <td style="background:#1a1a1a;padding:0 40px 44px;text-align:center;">
            <p style="margin:0 0 24px;font-size:15px;color:#d1d5db;line-height:1.75;">
              Thank you again for considering <strong style="color:#ffffff;">Sumer Renovations LLC</strong>.<br />
              We look forward to speaking with you soon.
            </p>
            <p style="margin:0 0 4px;font-size:14px;color:#9ca3af;">Warm regards,</p>
            <p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">Sumer Renovations LLC</p>
          </td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td style="background:#111111;border-top:1px solid #1e1e1e;padding:32px 40px;text-align:center;">
            <a href="https://sumerrenovationsllc.com"
               style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#a07030);color:#111111;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;padding:14px 40px;border-radius:6px;margin-bottom:20px;">
              Visit Our Website
            </a>
            <p style="margin:20px 0 0;font-size:13px;color:#4b5563;">
              Questions? Call us at <a href="tel:+15035453636" style="color:#c9a84c;text-decoration:none;font-weight:600;">(503) 545-3636</a>
              &nbsp;·&nbsp;
              <a href="mailto:sumerrenovations@gmail.com" style="color:#c9a84c;text-decoration:none;">sumerrenovations@gmail.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0a0a0a;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e,transparent);margin-bottom:16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;color:#4b5563;letter-spacing:0.08em;">© 2025 Sumer Renovations LLC &nbsp;·&nbsp; Portland, Oregon</p>
            <p style="margin:0;font-size:11px;color:#374151;">Licensed, Bonded &amp; Insured &nbsp;·&nbsp; Serving the Greater Portland Metro Area</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
    `;

    // ── Nodemailer transporter ──────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const FROM_ADDRESS = `Sumer Renovations LLC <${process.env.EMAIL_FROM}>`;
    const EMAIL_TO = process.env.EMAIL_TO ?? '';

    // ── Admin notification (critical path) ─────────────────────────────────
    try {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: EMAIL_TO,
        replyTo: email,
        subject: `New Client Inquiry — ${safe.fullName} | Sumer Renovations LLC`,
        html: notificationHtml,
      });
    } catch (emailErr: unknown) {
      console.error('Admin notification failed:', emailErr);
      console.log('CONTACT SUBMISSION (email failed):', JSON.stringify({
        fullName: safe.fullName,
        email: safe.email,
        phone: safe.phone,
        service: safe.service,
        budget: safe.budget,
        contactMethod: safe.contactMethod,
        message: safe.message,
      }));
    }

    // ── Customer auto-reply (best-effort) ───────────────────────────────────
    transporter.sendMail({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Thank You for Contacting Sumer Renovations LLC',
      html: autoReplyHtml,
    }).catch((err: unknown) => console.error('Auto-reply failed:', err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
