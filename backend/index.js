const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Resend } = require('resend');
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

// ✅ FIX 1: Use ONLY Resend-approved emails (NO Gmail fallback)
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.RECEIVER_EMAIL;

// ✅ Validate critical environment variables
if (!FROM_EMAIL) {
  console.error('❌ CRITICAL: FROM_EMAIL is not set in .env');
  console.error('   Use: FROM_EMAIL="Your Name <onboarding@resend.dev>" for testing');
  console.error('   Or verify a domain for production');
  process.exit(1);
}

if (!TO_EMAIL) {
  console.error('❌ CRITICAL: RECEIVER_EMAIL is not set in .env');
  process.exit(1);
}

if (!process.env.RESEND_API_KEY) {
  console.error('❌ CRITICAL: RESEND_API_KEY is not set in .env');
  process.exit(1);
}

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ FIX 2: Production-grade timeout helper with proper cleanup and error context
const sendWithTimeout = (promise, ms = 15000, label = "EMAIL") => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`${label}_TIMEOUT after ${ms}ms`));
      }, ms);

      // ✅ Cleanup timer if promise resolves early
      promise.finally(() => clearTimeout(timer));
    })
  ]);
};

// ✅ Verify Resend connection on startup
async function verifyResend() {
  try {
    // Test the API key by making a simple request
    console.log('✅ Resend initialized successfully');
    console.log(`📧 FROM_EMAIL: ${FROM_EMAIL}`);
    console.log(`📬 TO_EMAIL: ${TO_EMAIL}`);
    console.log(`⏱️  Email timeout: 15 seconds`);
    
    // Check if using dev mode
    if (FROM_EMAIL.includes('@resend.dev')) {
      console.log('⚠️  Using Resend development mode (onboarding@resend.dev)');
      console.log('   For production, verify a custom domain: https://resend.com/domains');
    }
  } catch (error) {
    console.error('❌ Resend initialization failed:', error.message);
    console.warn('⚠️  Please check your RESEND_API_KEY in .env');
  }
}
verifyResend();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    config: {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      mode: FROM_EMAIL.includes('@resend.dev') ? 'development' : 'production',
      timeout: '15 seconds'
    }
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ Add request logging for debugging
  console.log('📨 New contact form submission:', {
    name,
    email,
    messageLength: message?.length || 0,
    timestamp: new Date().toISOString()
  });

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
    // Admin email - Full HTML with all details
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { margin: 0; padding: 0; background: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #333; }
          .wrapper { max-width: 700px; margin: 40px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
          .header { background: #111827; color: #ffffff; padding: 28px 35px; }
          .header h2 { margin: 0; font-size: 24px; font-weight: 600; }
          .header p { margin: 8px 0 0; color: #d1d5db; font-size: 14px; }
          .content { padding: 35px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 14px 0; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
          .label { width: 140px; font-weight: 600; color: #6b7280; }
          .value { color: #111827; }
          .value a { color: #059669; text-decoration: none; }
          .message { margin-top: 30px; }
          .message h3 { margin-bottom: 12px; color: #111827; font-size: 18px; }
          .message-box { background: #f9fafb; border-left: 4px solid #059669; padding: 20px; border-radius: 6px; line-height: 1.7; color: #374151; white-space: pre-wrap; }
          .footer { background: #fafafa; border-top: 1px solid #e5e7eb; padding: 20px 35px; text-align: center; font-size: 13px; color: #6b7280; }
          .button { display: inline-block; margin-top: 20px; background: #059669; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 6px; font-weight: 600; }
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
              <div class="message-box">${message}</div>
            </div>
            <a class="button" href="mailto:${email}">Reply to ${name}</a>
          </div>
          <div class="footer">
            This notification was automatically generated from your portfolio contact form.
          </div>
        </div>
      </body>
      </html>
    `;

    // User auto-reply - Simpler, cleaner, lighter
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; background: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #333; }
          .wrapper { max-width: 650px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; }
          .header { background: #111827; color: #ffffff; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 35px; }
          .content p { line-height: 1.8; font-size: 15px; color: #4b5563; margin-bottom: 18px; }
          .message-box { margin: 30px 0; padding: 20px; background: #f9fafb; border-left: 4px solid #059669; border-radius: 6px; }
          .message-title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 10px; }
          .message-box p { margin: 0; color: #374151; }
          .info { margin-top: 25px; padding: 16px; background: #f3f4f6; border-radius: 6px; font-size: 14px; color: #6b7280; }
          .footer { border-top: 1px solid #e5e7eb; padding: 25px 35px; text-align: center; font-size: 14px; color: #6b7280; background: #fafafa; }
          .footer a { color: #059669; text-decoration: none; margin: 0 10px; }
          .signature { margin-top: 30px; color: #111827; }
          .signature strong { display: block; font-size: 16px; margin-bottom: 4px; }
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
              <div class="message-title">Your Submitted Message</div>
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
            <p>Thank you for your interest. I look forward to speaking with you.</p>
            <p>
              <a href="https://github.com/YOUR_GITHUB">GitHub</a> |
              <a href="https://www.linkedin.com/in/sibasis-routray-1b8bb924b">LinkedIn</a> |
              <a href="https://YOUR_PORTFOLIO_URL">Portfolio</a>
            </p>
            <p style="margin-top:20px;font-size:12px;color:#9ca3af;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // ✅ FIX 3: Send admin email with proper label for debugging
    console.log(`📤 Sending admin notification to: ${TO_EMAIL}`);
    
    const adminResult = await resend.emails.send({
  from: FROM_EMAIL,
  to: [TO_EMAIL],
  replyTo: email,
  subject: `New Portfolio Contact Form Submission - ${name}`,
  html: adminHtml,
});

console.log("Admin Result:", adminResult);

if (adminResult.error) {
  console.error("Admin Error:", adminResult.error);
  throw new Error(adminResult.error.message);
}

console.log("Admin Email ID:", adminResult.data.id);

    console.log(`✅ Admin notification sent (ID: ${adminResult.id})`);

    // ✅ Add small delay between emails
    await new Promise(resolve => setTimeout(resolve, 1200));

    // ✅ FIX 4: Send user auto-reply with proper label for debugging
    console.log(`📤 Sending auto-reply to: ${email}`);
    
    const userResult = await resend.emails.send({
  from: FROM_EMAIL,
  to: [email],
  subject: "Thank you for contacting me",
  html: userHtml,
});

console.log(userResult);

if (userResult.error) {
  console.error(userResult.error);
  throw new Error(userResult.error.message);
}

console.log("Email ID:", userResult.data.id);

    // console.log(`✅ Auto-reply sent to user (ID: ${userResult.id})`);
    console.log('✅ Contact form processed successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // ✅ FIX 5: Better error handling with specific timeout detection
    if (error.message && error.message.includes('_TIMEOUT')) {
      // Extract which email timed out from the error message
      const timeoutType = error.message.split('_')[0];
      console.error(`⏳ ${timeoutType} email timed out after 15 seconds`);
      
      return res.status(504).json({ 
        error: `${timeoutType} email timed out. Please try again.`,
        details: error.message
      });
    }
    
    if (error.statusCode === 401 || error.statusCode === 403) {
      console.error('🔐 Authentication failed. Please check your Resend API Key.');
      return res.status(401).json({ 
        error: 'Email authentication failed. Please check your Resend settings.' 
      });
    }
    
    if (error.statusCode === 422) {
      console.error('📧 Invalid email configuration. Domain not verified?');
      console.error(`   FROM_EMAIL: ${FROM_EMAIL}`);
      console.error(`   TO_EMAIL: ${TO_EMAIL}`);
      return res.status(422).json({ 
        error: 'Invalid email configuration. Please verify your domain with Resend.' 
      });
    }
    
    if (error.statusCode === 429) {
      console.error('⏳ Rate limit exceeded. Please wait before sending more emails.');
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }
    
    // ✅ Log the full error for debugging
    console.error('💥 Full error details:', {
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack
    });
    
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
  console.log(`📧 FROM_EMAIL: ${FROM_EMAIL}`);
  console.log(`📬 TO_EMAIL: ${TO_EMAIL}`);
  console.log(`🔧 Mode: ${FROM_EMAIL.includes('@resend.dev') ? 'DEVELOPMENT' : 'PRODUCTION'}`);
  console.log(`⏱️  Email timeout: 15 seconds`);
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