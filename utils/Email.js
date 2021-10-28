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
        user: process.env.USERNAME,
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
    throw err;
  }
};

exports.EmailVerify = async (id, email, msg, linkRoute) => {
  try {
    let token = await Token.findOne({ userId: id });
    if (!token) {
      token = await new Token({
        userId: id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/${linkRoute}/${id}/${token.token}`;
    await this.SendEmail(email, msg, link);
  } catch (err) {
    throw err;
  }
};
