import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const BUSINESS_EMAIL = 'sumerrenovations@gmail.com';
const FROM_ADDRESS = 'Sumer Renovations LLC <onboarding@resend.dev>';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { fullName, email, phone, service, budget, contactMethod, message } = body;

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // ── Business notification email ──────────────────────────────────────────
    const notificationHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:linear-gradient(135deg,#c9a84c,#a0742a);padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;color:#ffffff;font-size:22px">New Quote Request</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Sumer Renovations LLC</p>
        </div>
        <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#c9a84c">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#c9a84c">${phone}</a></td></tr>
            ${service ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Service</td><td style="padding:8px 0">${service}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Budget</td><td style="padding:8px 0">${budget}</td></tr>` : ''}
            ${contactMethod ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Preferred Contact</td><td style="padding:8px 0">${contactMethod}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:6px;border-left:3px solid #c9a84c">
            <p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Message</p>
            <p style="margin:0;white-space:pre-wrap">${message}</p>
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
          <p style="margin:0 0 16px">Hi ${fullName},</p>
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
        subject: `New Quote Request from ${fullName}`,
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
