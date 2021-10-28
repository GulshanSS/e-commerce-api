const { User, Token } = require("../models");
const { Email } = require("../utils");

module.exports = {
  emailVerificationLink: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ msg: "Email not found" });
      }
      await Email.EmailVerify(user._id, user.email);
      return res.status(200).json({
        msg: "Verification link sent to your registered mail account",
      });
    } catch (err) {
      return res.status(400).json({ msg: "Error sending mail." });
    }
  },
  verifyEmail: async (req, res) => {
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

      user.active = true;
      await user.save();
      await token.delete();

      return res.status(200).json({ msg: "Email Verified" });
    } catch (err) {
      return res.status(400).json({ msg: "Invalid Link or Expired" });
    }
  },
};
