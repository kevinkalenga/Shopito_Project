const nodemailer = require("nodemailer");
const MailGen = require("mailgen")

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Shopito Website",
    link: "http://localhost:3000",
  },
});



const sendEmail = async (to, subject, text, reply_to, cc) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
      },
    });

    
      const email = {
        body: {
          intro: text,
          outro: "Merci d'avoir choisi Shopito !",
        },
      };

      const html = mailGenerator.generate(email);
    
    
    
    
    const mailOptions = {
      from: `"Shopito" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    };

    if (reply_to) {
      mailOptions.replyTo = reply_to;
    }

    if (cc) {
      mailOptions.cc = cc;
    }
    
    
    
    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESS:", info.response);
    return info;

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;