const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
      },
    });

    const mailOptions = {
      from: `"Shopito" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESS:", info.response);
    return info;

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;