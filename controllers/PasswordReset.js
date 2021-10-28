const crypto = require("crypto");

const { Bcrypt } = require("../utils");
const { User, Token } = require("../models");
const { SendEmail } = require("../utils");

module.exports = {
  sendLink: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ mag: "Email not found" });
      }
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }
      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
      await SendEmail(user.email, "Password reset", link);

      return res
        .status(200)
        .json({ msg: "Reset link sent to your registered mail account" });
    } catch (err) {
      return res.status(400).json({ msg: "Error sending mail" });
    }
  },
  resetPass: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(400).json({ msg: "Invalid link or Expired" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token)
        return res.status(400).json({ msg: "Invalid link or Expired" });

      user.password = Bcrypt.genHash(req.body.password, 10);
      await user.save();
      await token.delete();

      return res.status(200).json({ msg: "Password Reset Successful" });
    } catch (err) {
      return res.status(400).json({ msg: "Invalid Link or Expired" });
    }
  },
};
