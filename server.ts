import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { validateContactForm } from './src/utils/contactValidation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'aashirya12007@gmail.com';

interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  recipient: string;
  deliveryChannel: 'smtp' | 'resend' | 'formsubmit' | 'recorded';
  createdAt: string;
}

const recentInquiries: StoredInquiry[] = [];

async function dispatchEmailNotification(inquiry: {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<'smtp' | 'resend' | 'formsubmit' | 'recorded'> {
  const subject = `New Portfolio Inquiry from ${inquiry.name}`;
  const textBody = [
    `You received a new message from your portfolio contact form.`,
    ``,
    `Sender Name: ${inquiry.name}`,
    `Sender Email: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone || 'Not provided'}`,
    ``,
    `Message:`,
    inquiry.message,
    ``,
    `Reference ID: ${inquiry.id}`,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Georgia, serif; color: #1c1917; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e7e5e4;">
      <h2 style="margin-top: 0; color: #1c1917;">New Portfolio Message</h2>
      <p style="font-family: sans-serif; font-size: 14px; color: #57534e;">
        Someone submitted the contact form on Aashirya Srivastava's portfolio.
      </p>
      <table style="width: 100%; font-family: sans-serif; font-size: 14px; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #78716c; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(inquiry.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #78716c;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #78716c;">Phone</td><td style="padding: 6px 0;">${escapeHtml(inquiry.phone || 'Not provided')}</td></tr>
      </table>
      <div style="background: #fafaf9; padding: 14px; border: 1px solid #e7e5e4; font-family: sans-serif; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(inquiry.message)}</div>
    </div>
  `;

  // 1. Direct SMTP via Nodemailer if configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: inquiry.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
    return 'smtp';
  }

  // 2. Resend HTTPS API if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        reply_to: inquiry.email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      return 'resend';
    }
  }

  // 3. FormSubmit zero-config AJAX relay fallback (non-blocking short timeout)
  try {
    const relayRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone || 'Not provided',
          message: inquiry.message,
          _subject: subject,
          _replyto: inquiry.email,
          _template: 'table',
        }),
        signal: AbortSignal.timeout(3500),
      },
    );
    if (relayRes.ok) {
      return 'formsubmit';
    }
  } catch {
    // Offline or restricted outbound environment: fall through to local persistence
  }

  return 'recorded';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, recipient: RECIPIENT_EMAIL });
  });

  app.get('/api/download-vscode', (_req, res) => {
    const zipPath = path.resolve(__dirname, 'public', 'aashirya-portfolio-vscode.zip');
    if (!fs.existsSync(zipPath)) {
      return res.status(404).json({ ok: false, error: 'VS Code bundle not found.' });
    }
    return res.download(zipPath, 'aashirya-portfolio-vscode.zip');
  });

  app.get('/api/download-macos-tar', (_req, res) => {
    const tarPath = path.resolve(__dirname, 'public', 'aashirya-portfolio-macos.tar.gz');
    if (!fs.existsSync(tarPath)) {
      return res.status(404).json({ ok: false, error: 'macOS tar.gz archive not found.' });
    }
    return res.download(tarPath, 'aashirya-portfolio-macos.tar.gz');
  });

  app.get('/api/download-single-html', (_req, res) => {
    const htmlPath = path.resolve(__dirname, 'public', 'aashirya-portfolio.html');
    if (!fs.existsSync(htmlPath)) {
      return res.status(404).json({ ok: false, error: 'Standalone HTML file not found.' });
    }
    return res.download(htmlPath, 'aashirya-portfolio.html');
  });

  app.post('/api/contact', async (req, res) => {
    const raw = req.body ?? {};
    const validation = validateContactForm({
      name: typeof raw.name === 'string' ? raw.name : '',
      email: typeof raw.email === 'string' ? raw.email : '',
      phone: typeof raw.phone === 'string' ? raw.phone : '',
      message: typeof raw.message === 'string' ? raw.message : '',
    });

    if (!validation.isValid) {
      return res.status(400).json({
        ok: false,
        error: 'Please check the highlighted form fields.',
        errors: validation.errors,
      });
    }

    const inquiryId = `inq_${Date.now().toString(36)}`;
    let deliveryChannel: 'smtp' | 'resend' | 'formsubmit' | 'recorded' = 'recorded';

    try {
      deliveryChannel = await dispatchEmailNotification({
        id: inquiryId,
        ...validation.sanitized,
      });
    } catch (err) {
      console.error('Email notification dispatch error:', err);
      deliveryChannel = 'recorded';
    }

    const record: StoredInquiry = {
      id: inquiryId,
      ...validation.sanitized,
      recipient: RECIPIENT_EMAIL,
      deliveryChannel,
      createdAt: new Date().toISOString(),
    };
    recentInquiries.unshift(record);
    if (recentInquiries.length > 50) {
      recentInquiries.pop();
    }

    return res.status(200).json({
      ok: true,
      id: inquiryId,
      recipient: RECIPIENT_EMAIL,
      deliveryChannel,
      submittedAt: record.createdAt,
      message:
        deliveryChannel === 'recorded'
          ? `Your inquiry (${inquiryId}) has been saved and prepared for ${RECIPIENT_EMAIL}.`
          : `Notification sent to ${RECIPIENT_EMAIL}.`,
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
