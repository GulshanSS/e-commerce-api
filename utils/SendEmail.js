const nodemailer = require("nodemailer");

const SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Error sending email" });
  }
};

module.exports = SendEmail;
