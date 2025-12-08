import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtpEmail = async (to: string, code: string) => {
  await transporter.sendMail({
    from: `"Mi App" <${process.env.MAIL_USER}>`,
    to,
    subject: "Tu código de verificación",
    text: `Tu código es: ${code}`,
    html: `<h2>Tu código de verificación</h2><b>${code}</b>`,
  });
};
