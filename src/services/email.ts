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
    from: `"Task-ts App" <${process.env.MAIL_USER}>`,
    to,
    subject: "Tu código de verificación",
    text: `Tu código de verificación es: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
        <div style="max-width:500px; margin:auto; background:#ffffff; padding:25px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <h2 style="color:#333; text-align:center;">Tu código de verificación</h2>
          <p style="font-size:15px; color:#555;">
            Hola, gracias por usar <b>Task-ts App</b>.  
            Para continuar con tu proceso, utiliza el siguiente código:
          </p>

          <div style="text-align:center; margin:25px 0;">
            <span style="font-size:30px; font-weight:bold; color:#2c7be5; letter-spacing:4px;">
              ${code}
            </span>
          </div>

          <p style="font-size:14px; color:#777;">
            Este código es válido por unos minutos.  
            Si no solicitaste este correo, puedes ignorarlo.
          </p>

          <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

          <p style="font-size:12px; color:#999; text-align:center;">
            © ${new Date().getFullYear()} Task-ts App. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `,
  });
};
