const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Morgan logging middleware
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST', 'GET'],
}));
app.use(express.json());

// ✅ FIX 1: CREATE ONE GLOBAL TRANSPORTER (NOT inside route)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4 // Forces IPv4
});

// ✅ FIX 2: VERIFY ONCE ON STARTUP
transporter.verify()
  .then(() => {
    console.log('✅ SMTP connection verified successfully');
    console.log(`📧 Using Gmail: ${process.env.GMAIL_USER}`);
  })
  .catch(err => {
    console.error('❌ SMTP verification failed:', err.message);
    console.warn('⚠️  Please check your GMAIL_USER and GMAIL_APP_PASSWORD in .env');
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Log incoming request
  console.log(`📨 New contact form submission from: ${email}`);

  // Validate required fields
  if (!name || !email || !message) {
    console.warn('⚠️  Missing required fields');
    return res.status(400).json({ 
      error: 'Please fill in all required fields' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn(`⚠️  Invalid email format: ${email}`);
    return res.status(400).json({ 
      error: 'Please enter a valid email address' 
    });
  }

  try {
    // 1. Email to you (the receiver/admin)
    const adminMailOptions = {
      from: `"Portfolio Website" <${process.env.GMAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER,
      subject: `New Portfolio Contact Form Submission - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #f4f6f8;
              font-family: Arial, Helvetica, sans-serif;
              color: #333;
            }

            .wrapper {
              max-width: 700px;
              margin: 40px auto;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 10px;
              overflow: hidden;
            }

            .header {
              background: #111827;
              color: #ffffff;
              padding: 28px 35px;
            }

            .header h2 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }

            .header p {
              margin: 8px 0 0;
              color: #d1d5db;
              font-size: 14px;
            }

            .content {
              padding: 35px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            td {
              padding: 14px 0;
              vertical-align: top;
              border-bottom: 1px solid #f1f5f9;
            }

            .label {
              width: 140px;
              font-weight: 600;
              color: #6b7280;
            }

            .value {
              color: #111827;
            }

            .value a {
              color: #059669;
              text-decoration: none;
            }

            .message {
              margin-top: 30px;
            }

            .message h3 {
              margin-bottom: 12px;
              color: #111827;
              font-size: 18px;
            }

            .message-box {
              background: #f9fafb;
              border-left: 4px solid #059669;
              padding: 20px;
              border-radius: 6px;
              line-height: 1.7;
              color: #374151;
              white-space: pre-wrap;
            }

            .footer {
              background: #fafafa;
              border-top: 1px solid #e5e7eb;
              padding: 20px 35px;
              text-align: center;
              font-size: 13px;
              color: #6b7280;
            }

            .button {
              display: inline-block;
              margin-top: 20px;
              background: #059669;
              color: #ffffff !important;
              text-decoration: none;
              padding: 12px 22px;
              border-radius: 6px;
              font-weight: 600;
            }
          </style>
        </head>

        <body>
          <div class="wrapper">

            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>A new inquiry has been submitted through your portfolio website.</p>
            </div>

            <div class="content">

              <table>
                <tr>
                  <td class="label">Name</td>
                  <td class="value">${name}</td>
                </tr>

                <tr>
                  <td class="label">Email</td>
                  <td class="value">
                    <a href="mailto:${email}">${email}</a>
                  </td>
                </tr>

                <tr>
                  <td class="label">Submitted On</td>
                  <td class="value">
                    ${new Date().toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              </table>

              <div class="message">
                <h3>Message</h3>

                <div class="message-box">
                  ${message}
                </div>
              </div>

              <a class="button" href="mailto:${email}">
                Reply to ${name}
              </a>

            </div>

            <div class="footer">
              This notification was automatically generated from your portfolio contact form.
            </div>

          </div>
        </body>
        </html>
      `,
    };

    // 2. Auto-reply to the user (confirmation email)
    const userAutoReplyOptions = {
      from: `"Sibasis Routray" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #f4f6f8;
              font-family: Arial, Helvetica, sans-serif;
              color: #333;
            }

            .wrapper {
              max-width: 650px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              border: 1px solid #e5e7eb;
            }

            .header {
              background: #111827;
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }

            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }

            .content {
              padding: 35px;
            }

            .content p {
              line-height: 1.8;
              font-size: 15px;
              color: #4b5563;
              margin-bottom: 18px;
            }

            .message-box {
              margin: 30px 0;
              padding: 20px;
              background: #f9fafb;
              border-left: 4px solid #059669;
              border-radius: 6px;
            }

            .message-title {
              font-size: 14px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 10px;
            }

            .message-box p {
              margin: 0;
              color: #374151;
            }

            .info {
              margin-top: 25px;
              padding: 16px;
              background: #f3f4f6;
              border-radius: 6px;
              font-size: 14px;
              color: #6b7280;
            }

            .footer {
              border-top: 1px solid #e5e7eb;
              padding: 25px 35px;
              text-align: center;
              font-size: 14px;
              color: #6b7280;
              background: #fafafa;
            }

            .footer a {
              color: #059669;
              text-decoration: none;
              margin: 0 10px;
            }

            .signature {
              margin-top: 30px;
              color: #111827;
            }

            .signature strong {
              display: block;
              font-size: 16px;
              margin-bottom: 4px;
            }

            .button {
              display: inline-block;
              margin-top: 25px;
              padding: 12px 24px;
              background: #059669;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
            }
          </style>
        </head>

        <body>
          <div class="wrapper">

            <div class="header">
              <h1>Thank You for Reaching Out</h1>
            </div>

            <div class="content">

              <p>Dear <strong>${name}</strong>,</p>

              <p>
                Thank you for contacting me. I have successfully received your message
                and appreciate you taking the time to reach out.
              </p>

              <p>
                I will carefully review your inquiry and respond as soon as possible,
                typically within <strong>24 hours</strong>.
              </p>

              <div class="message-box">
                <div class="message-title">
                  Your Submitted Message
                </div>

                <p>${message}</p>
              </div>

              <div class="info">
                <strong>Submission Date</strong><br>
                ${new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <div class="signature">
                <strong>Sibasis Routray</strong>
                Software Developer
              </div>

            </div>

            <div class="footer">
              <p>
                Thank you for your interest. I look forward to speaking with you.
              </p>

              <p>
                <a href="https://github.com/YOUR_GITHUB">GitHub</a> |
                <a href="https://www.linkedin.com/in/sibasis-routray-1b8bb924b?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a> |
                <a href="https://YOUR_PORTFOLIO_URL">Portfolio</a>
              </p>

              <p style="margin-top:20px;font-size:12px;color:#9ca3af;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    };

    // ✅ FIX 3: SEND EMAILS WITH DELAY
    console.log(`📤 Sending admin notification to: ${process.env.RECEIVER_EMAIL || process.env.GMAIL_USER}`);
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification sent');

    // ✅ CRITICAL: Add delay between emails to prevent timeout
    await new Promise(resolve => setTimeout(resolve, 1200));

    console.log(`📤 Sending auto-reply to: ${email}`);
    await transporter.sendMail(userAutoReplyOptions);
    console.log('✅ Auto-reply sent to user');

    console.log('✅ Contact form processed successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Handle specific Gmail errors
    if (error.code === 'EAUTH') {
      console.error('🔐 Authentication failed. Please check your Gmail App Password.');
      return res.status(401).json({ 
        error: 'Email authentication failed. Please check your Gmail settings.' 
      });
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ENETUNREACH') {
      console.error('🌐 Connection error. Please check your internet connection.');
      return res.status(503).json({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong on the server.' 
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📧 Using Gmail: ${process.env.GMAIL_USER}`);
  console.log(`📬 Receiver email: ${process.env.RECEIVER_EMAIL || process.env.GMAIL_USER}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   • GET  /api/health - Health check`);
  console.log(`   • POST /api/contact - Send contact form`);
  console.log(`\n✨ Server ready for requests!\n`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});