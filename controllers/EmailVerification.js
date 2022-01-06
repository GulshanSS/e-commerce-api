const { User, Token } = require("../models");
const { Email } = require("../utils");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

exports.sendEmailVerificationLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new ErrorHandler(404, "Email not found"));
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
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) next(new ErrorHandler(404, "User not found"));

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) next(new ErrorHandler(404, "Token not Found"));

  user.active = true;
  await user.save();
  await token.delete();

  return res.status(202).json({ msg: "Email Verified" });
});
