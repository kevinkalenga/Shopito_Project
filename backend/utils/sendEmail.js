const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Shopito Website",
    link: "http://localhost:3000",
  },
});

const sendEmail = async (to, subject, text,template, reply_to, cc) => {
  try {
    console.log("========== SEND EMAIL ==========");
    console.log("TO:", to);
    console.log("FROM:", process.env.EMAIL_USER);
    console.log("SUBJECT:", subject);
    console.log("TEXT:", text);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
      },
    });

    // const email = {
    //   body: {
    //     intro: text,
    //     outro: "Thank you for choosing Shopito !",
    //   },
    // };

    // const html = mailGenerator.generate(email);

      // Générer le HTML avec MailGen
    const html = template
      ? mailGenerator.generate(template)
      : mailGenerator.generate({
          body: {
            intro: text,
            outro: "Thank you for choosing Shopito !",
          },
        });

    const mailOptions = {
      from: `"Shopito" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    if (reply_to) {
      mailOptions.replyTo = reply_to;
    }

    if (cc) {
      mailOptions.cc = cc;
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("========== EMAIL SENT ==========");
    console.log("MESSAGE ID:", info.messageId);
    console.log("RESPONSE:", info.response);
    console.log("ACCEPTED:", info.accepted);
    console.log("REJECTED:", info.rejected);

    return info;

  } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error(error);

    throw error;
  }
};

module.exports = sendEmail;