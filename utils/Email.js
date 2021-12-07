const nodemailer = require("nodemailer");
const { Token } = require("../models");
const crypto = require("crypto");

exports.SendEmail = async (email, subject, data, btnText) => {
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
        `action="http://localhost:3000/${data}">` +
        "<button type='submit' style='background:#00FF00;width:150px;height:50px;color:white;font-weight:500;font-size:20px;border-radius:8px;border:none;'>" +
        `${btnText}` +
        "</button>" +
        "</form>",
    });
  } catch (err) {
    throw err;
  }
};

exports.generateVerificationLink = async (id, email, msg, linkroute, btnText) => {
  try {
    let token = await Token.findOne({ userId: id });
    if (!token) {
      token = await new Token({
        userId: id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${linkroute}/${id}/${token.token}`;
    await this.SendEmail(email, msg, link, btnText);
  } catch (err) {
    throw err;
  }
};
