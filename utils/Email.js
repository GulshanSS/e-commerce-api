const nodemailer = require("nodemailer");
const { Token } = require("../models");
const crypto = require("crypto");

exports.SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html:
        "<form " +
        "method='get'" +
        `action="http://localhost:3000/emailVerify/${text}">` +
        "<button type='submit' style='background:#00FF00;width:100px;height:50px;color:white;font-weight:500;font-size:20px;border-radius:8px;border:none;'>" +
        "Verify" +
        "</button>" +
        "</form>",
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
    const link = `${id}/${token.token}`;
    await this.SendEmail(email, msg, link);
  } catch (err) {
    throw err;
  }
};
