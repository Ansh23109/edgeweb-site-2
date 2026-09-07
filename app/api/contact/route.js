import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

function buildHtmlBody(data, service) {
  const entries = [
    ['Name', data.name || '-'],
    ['Email', data.email || '-'],
    ['Phone', data.phone || '-'],
    ['Company', data.company || '-'],
    ['Website', data.website || '-'],
    ['Service', service || '-'],
    ['Budget', data.budget || '-'],
    ['Timeline', data.timeline || '-'],
    ['Heard about us', data.hearAbout || '-'],
    ['Goal', data.goal || '-'],
    ['Source', data.source || data.utm_source || '-'],
    ['Medium', data.utm_medium || '-'],
    ['Campaign', data.utm_campaign || '-'],
    ['Landing page', data.landing_page || '-'],
    ['Referrer', data.referrer || '-'],
    ['Submitted at', data.submitted_at || new Date().toISOString()],
    ['Project details', data.details || '-'],
  ];

  return `
    <h2>New EdgeWeb enquiry</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-family:Arial,sans-serif;">
      ${entries
        .map(
          ([label, value]) => `
            <tr>
              <td style="padding:8px 10px; font-weight:bold; background:#f5f5f5;">${label}</td>
              <td style="padding:8px 10px;">${String(value).replace(/\n/g, '<br>')}</td>
            </tr>
          `
        )
        .join('')}
    </table>
  `;
}

function buildThankYouHtml(name, service) {
  const firstName = String(name || '').trim().split(/\s+/)[0] || 'there';
  return `
    <div style="font-family:Arial,sans-serif; color:#1a1a1a; max-width:560px;">
      <h2 style="margin-bottom:4px;">Thanks, ${firstName} — we've got it.</h2>
      <p>We've received your enquiry${service ? ` about <strong>${service}</strong>` : ''} and will get back to you shortly with real next steps — not a sales script.</p>
      <p>If it's urgent, message us directly on WhatsApp: <a href="https://wa.me/919266726490">+91 92667 26490</a>.</p>
      <p style="margin-top:24px; color:#555;">— The EdgeWeb team<br/>info@edgeweb.co</p>
    </div>
  `;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Invalid request body' }, { status: 400 });
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  // The contact page sends `service`; the discovery-popup sends `buildType`
  // instead — accept either so popup submissions don't get rejected.
  const service = String(payload.service || payload.buildType || '').trim();
  const details = String(payload.details || '').trim();

  if (!name || !email || !service || !details) {
    return NextResponse.json({ ok: false, message: 'Missing required contact fields' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.TO_EMAIL || process.env.SMTP_USER || 'info@edgeweb.co';

  if (!smtpHost || !smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        ok: false,
        message: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment variables.',
      },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user: smtpUser, pass: smtpPass },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: recipientEmail,
      replyTo: email,
      subject: `New project enquiry — ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${payload.phone || '-'}`,
        `Company: ${payload.company || '-'}`,
        `Website: ${payload.website || '-'}`,
        `Service: ${service}`,
        `Budget: ${payload.budget || '-'}`,
        `Timeline: ${payload.timeline || '-'}`,
        `Heard about us: ${payload.hearAbout || '-'}`,
        '',
        'Project details:',
        details,
      ].join('\n'),
      html: buildHtmlBody(payload, service),
    });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to send email right now. Please email us directly at info@edgeweb.co.' },
      { status: 500 }
    );
  }

  // Best-effort confirmation email to the person who submitted the form —
  // failing to send this shouldn't fail the whole request, since the
  // notification to EdgeWeb above already succeeded.
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: email,
      replyTo: recipientEmail,
      subject: "Thanks — EdgeWeb has your enquiry",
      text: `Thanks, ${name.split(/\s+/)[0]} — we've received your enquiry about ${service} and will get back to you shortly. If it's urgent, WhatsApp us at +91 92667 26490.`,
      html: buildThankYouHtml(name, service),
    });
  } catch (error) {
    console.error('Contact form thank-you email error:', error);
  }

  return NextResponse.json({ ok: true, message: 'Email sent successfully' });
}
