const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7647c165d6d6ac",
      pass: "2d9a38df23315e",
    },
  });

  const message = {
    from: `shopIt noreply@shopit.com`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
  console.log("sent");
};

module.exports = sendEmail;
