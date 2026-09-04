const nodemailer = require('nodemailer');

function buildHtmlBody(data) {
  const entries = [
    ['Name', data.name || '-'],
    ['Email', data.email || '-'],
    ['Phone', data.phone || '-'],
    ['Company', data.company || '-'],
    ['Website', data.website || '-'],
    ['Service', data.service || '-'],
    ['Budget', data.budget || '-'],
    ['Timeline', data.timeline || '-'],
    ['Heard about us', data.hearAbout || '-'],
    ['Source', data.utm_source || '-'],
    ['Medium', data.utm_medium || '-'],
    ['Campaign', data.utm_campaign || '-'],
    ['Landing page', data.landing_page || '-'],
    ['Referrer', data.referrer || '-'],
    ['Submitted at', data.submitted_at || new Date().toISOString()],
    ['Project details', data.details || '-']
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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};
    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim();
    const service = String(payload.service || '').trim();
    const details = String(payload.details || '').trim();

    if (!name || !email || !service || !details) {
      return res.status(400).json({ ok: false, message: 'Missing required contact fields' });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.TO_EMAIL || process.env.SMTP_USER || 'info@edgeweb.co';

    if (!smtpHost || !smtpUser || !smtpPass) {
      return res.status(500).json({
        ok: false,
        message: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in Vercel environment variables.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
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
        details
      ].join('\n'),
      html: buildHtmlBody(payload)
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ ok: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Unable to send email right now. Please email us directly at info@edgeweb.co.'
    });
  }
};
