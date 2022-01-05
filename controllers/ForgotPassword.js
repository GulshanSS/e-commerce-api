const crypto = require("crypto");

const { Bcrypt } = require("../utils");
const { User, Token } = require("../models");
const { Email } = require("../utils");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");


module.exports = {
  sendLink: asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      next(new ErrorHandler(404, "Email not found"));
    }
    await Email.generateVerificationLink(
      user._id,
      user.email,
      "Password reset link",
      "forgotPassword",
      "Reset Password"
    );
    return res
      .status(200)
      .json({ msg: "Reset link sent to your registered mail account" });
  }),
  forgotPass: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) next(new ErrorHandler(404, "User not found"));

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) next(new ErrorHandler(404, "Token not found"));

    user.password = await Bcrypt.genHash(req.body.password, 10);
    await user.save();
    await token.delete();

    return res.status(202).json({ msg: "Password Reset Successful" });
  }),
};
