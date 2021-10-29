const crypto = require("crypto");

const { Bcrypt } = require("../utils");
const { User, Token } = require("../models");
const { Email } = require("../utils");

module.exports = {
  sendLink: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ mag: "Email not found" });
      }
      await Email.EmailVerify(
        user._id,
        user.email,
        "Password reset link",
        "forgot-password"
      );
      return res
        .status(200)
        .json({ msg: "Reset link sent to your registered mail account" });
    } catch (err) {
      return res.status(409).json({ msg: "Error sending mail" });
    }
  },
  forgotPass: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(404).json({ msg: "User not found" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token)
        return res.status(404).json({ msg: "Token not found" });

      user.password = await Bcrypt.genHash(req.body.password, 10);
      await user.save();
      await token.delete();

      return res.status(202).json({ msg: "Password Reset Successful" });
    } catch (err) {
      return res.status(409).json({ msg: "Invalid Link or Expired" });
    }
  },
};
