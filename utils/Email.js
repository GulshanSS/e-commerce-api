const nodemailer = require("nodemailer");
const { Token } = require("../models");
const crypto = require("crypto");

exports.SendEmail = async (email, subject, text) => {
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
    return res.status(400).json({ msg: "Error sending email" });
  }
};

exports.EmailVerify = async (id, email) => {
  try {
    let token = await Token.findOne({ userId: id });
    if (!token) {
      token = await new Token({
        userId: id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/verify/${id}/${token.token}`;
    await this.SendEmail(email, "Email Verification", link);
  } catch (err) {
    throw err;
  }
};
