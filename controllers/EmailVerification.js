const { User, Token } = require("../models");
const { Email } = require("../utils");

module.exports = {
  sendEmailVerificationLink: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "Email not found" });
      }
      await Email.generateVerificationLink(
        user._id,
        user.email,
        "Email Verification link",
        "emailVerify",
        "Verify"
      );
      return res.status(200).json({
        msg: "Verification link sent to your registered mail account",
      });
    } catch (err) {
      return res.status(409).json({ msg: "Error sending mail." });
    }
  },
  verifyEmail: async (req, res) => {
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

      user.active = true;
      await user.save();
      await token.delete();

      return res.status(202).json({ msg: "Email Verified" });
    } catch (err) {
      return res.status(409).json({ msg: "Invalid Link or Expired" });
    }
  },
};
