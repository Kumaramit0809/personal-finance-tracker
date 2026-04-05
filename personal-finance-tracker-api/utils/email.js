const nodemailer = require('nodemailer');

const sendResetEmail = async (toEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Must be Gmail App Password, not your login password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Verify connection before sending
  await transporter.verify();

  const mailOptions = {
    from: `"FinTrack" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset your FinTrack password',
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #2563eb); border-radius: 12px; color: white; font-size: 22px; font-weight: 700;">₹</div>
          <h2 style="margin: 12px 0 4px; color: #1e293b;">FinTrack</h2>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Personal Finance Tracker</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
          <h3 style="margin: 0 0 12px; color: #1e293b;">Reset your password</h3>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            We received a request to reset your password. Click the button below. This link expires in <strong>1 hour</strong>.
          </p>
          <a href="${resetLink}" style="display: block; text-align: center; padding: 12px 24px; background: linear-gradient(135deg, #10b981, #2563eb); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
            Reset Password
          </a>
          <p style="margin: 20px 0 0; color: #94a3b8; font-size: 12px; text-align: center;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
