// const nodemailer = require("nodemailer");
// const MailGen = require("mailgen")

// const mailGenerator = new MailGen({
//   theme: "salted",
//   product: {
//     name: "Shopito Website",
//     link: "http://localhost:3000",
//   },
// });



// const sendEmail = async (to, subject, text, template, reply_to, cc) => {
//   try {
    
    
//       console.log("========== SEND EMAIL ==========");
//       console.log("TO:", to);
//       console.log("FROM:", process.env.EMAIL_USER);
//       console.log("SUBJECT:", subject);
    
    
    
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
//       },
//     });

    
//     // Générer le HTML avec MailGen
//     const html = template
//       ? mailGenerator.generate(template)
//       : mailGenerator.generate({
//           body: {
//             intro: text,
//             outro: "Merci d'avoir choisi Shopito !",
//           },
//         });

     
    
    
    
    
//     const mailOptions = {
//       from: `"Shopito" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html
//     };

//     if (reply_to) {
//       mailOptions.replyTo = reply_to;
//     }

//     if (cc) {
//       mailOptions.cc = cc;
//     }
    
    
    
//     const info = await transporter.sendMail(mailOptions);

//     console.log("========== EMAIL DEBUG ==========");
//     console.log("FROM:", process.env.EMAIL_USER);
//     console.log("TO:", to);
//     console.log("SUBJECT:", subject);
//     console.log("MESSAGE ID:", info.messageId);
//     console.log("RESPONSE:", info.response);
//     console.log("ACCEPTED:", info.accepted);
//     console.log("REJECTED:", info.rejected);
//     console.log("ENVELOPE:", info.envelope);

//     // console.log("EMAIL SENT SUCCESS:", info.response);
//     return info;

//   } catch (error) {
//     console.log("EMAIL ERROR:", error);
//     throw new Error("Email sending failed");
//   }
// };

// module.exports = sendEmail;

/////////////////////////////////////////////////////////////


const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  text,
  template,
  reply_to,
  cc
) => {
  try {
    console.log("========== SEND EMAIL ==========");
    console.log("TO:", to);
    console.log("FROM:", process.env.EMAIL_USER);
    console.log("SUBJECT:", subject);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
      },
    });

    await transporter.verify();

    console.log("SMTP CONNECTION: OK");

    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <h2>Shopito</h2>

          <p>Bonjour ${to},</p>

          <p>${text}</p>

          <p>Votre commande a bien été enregistrée.</p>

          <p>
            <a href="http://localhost:3000">
              Accéder à Shopito
            </a>
          </p>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"Shopito" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    if (reply_to) {
      mailOptions.replyTo = reply_to;
    }

    if (cc) {
      mailOptions.cc = cc;
    }

    console.log("========== MAIL OPTIONS ==========");
    console.log({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    console.log("SENDING EMAIL...");

    const info = await transporter.sendMail(mailOptions);

    console.log("========== EMAIL SENT ==========");
    console.log("MESSAGE ID:", info.messageId);
    console.log("RESPONSE:", info.response);
    console.log("ACCEPTED:", info.accepted);
    console.log("REJECTED:", info.rejected);
    console.log("ENVELOPE:", info.envelope);

    return info;

  } catch (error) {

    console.error("========== EMAIL ERROR ==========");
    console.error("NAME:", error.name);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);
    console.error("RESPONSE:", error.response);

    throw error;
  }
};

module.exports = sendEmail;


////////////////////////////////////////////////////////////////////////////////////////////


// const nodemailer = require("nodemailer");
// const MailGen = require("mailgen");

// const mailGenerator = new MailGen({
//   theme: "salted",
//   product: {
//     name: "Shopito Website",
//     link: "http://localhost:3000",
//   },
// });

// const sendEmail = async (
//   to,
//   subject,
//   text,
//   template,
//   reply_to,
//   cc
// ) => {
//   try {
//     console.log("========== SEND EMAIL ==========");
//     console.log("TO:", to);
//     console.log("FROM:", process.env.EMAIL_USER);
//     console.log("SUBJECT:", subject);

//     console.log("========== TEMPLATE ==========");
//     console.log("Template exists:", !!template);
//     console.log("Template type:", typeof template);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
//       },
//     });

//     /*
//      * Si le template MailGen existe,
//      * on génère l'email avec MailGen.
//      */
//     let html;

//     if (template) {
//       console.log("Generating HTML with MailGen...");

//       html = mailGenerator.generate(template);

//       console.log("MailGen HTML generated successfully.");
//     } else {
//       console.log("No MailGen template received.");

//       html = mailGenerator.generate({
//         body: {
//           intro: text,
//           outro: "Thank you for choosing Shopito!",
//         },
//       });
//     }

//     const mailOptions = {
//       from: `"Shopito" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     };

//     if (reply_to) {
//       mailOptions.replyTo = reply_to;
//     }

//     if (cc) {
//       mailOptions.cc = cc;
//     }

//     console.log("SENDING EMAIL...");

//     const info = await transporter.sendMail(mailOptions);

//     console.log("========== EMAIL SENT ==========");
//     console.log("MESSAGE ID:", info.messageId);
//     console.log("RESPONSE:", info.response);
//     console.log("ACCEPTED:", info.accepted);
//     console.log("REJECTED:", info.rejected);

//     return info;

//   } catch (error) {
//     console.error("========== EMAIL ERROR ==========");
//     console.error("NAME:", error.name);
//     console.error("MESSAGE:", error.message);
//     console.error("CODE:", error.code);
//     console.error("RESPONSE:", error.response);

//     throw error;
//   }
// };

// module.exports = sendEmail;


