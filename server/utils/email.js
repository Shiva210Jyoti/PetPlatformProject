const nodemailer = require('nodemailer');

let transporter;

const buildTransporter = () => {
  if (transporter) {
    return transporter;
  }

  const {
    EMAIL_SERVICE,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS
  } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('Email not configured: missing EMAIL_USER or EMAIL_PASS.');
    return null;
  }

  try {
    if (EMAIL_SERVICE) {
      transporter = nodemailer.createTransport({
        service: EMAIL_SERVICE,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
      });
    } else if (EMAIL_HOST && EMAIL_PORT) {
      transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: Number(EMAIL_PORT) === 465,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
      });
    } else {
      console.warn('Email not configured: provide EMAIL_SERVICE or EMAIL_HOST/EMAIL_PORT.');
      return null;
    }

    return transporter;
  } catch (err) {
    console.error('Failed to initialize email transporter', err);
    return null;
  }
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transport = buildTransporter();

  if (!transport) {
    return;
  }

  try {
    await transport.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    });
  } catch (err) {
    console.error('Failed to send email', err);
  }
};

module.exports = {
  sendEmail
};

