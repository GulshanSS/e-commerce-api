const { Bcrypt } = require("../utils");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

exports.Register = asyncHandler(async (req, res, next) => {
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.now,
    mobile: req.body.mobile,
    password: req.body.password,
    address: req.body.address,
    gender: req.body.gender,
    role: req.body.role,
  }).save();
  if (!user) {
    next(406, "Cannot Register the user. Try again later!!");
  }
  await user.generateVerificationLink(
    user._id,
    user.email,
    "Email Verification",
    "emailVerify",
    "Verify"
  );
  return res.status(201).json({
    msg: "Registered successfully and verification link sent to your registered mail account",
  });
});

exports.Login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new ErrorHandler(404, "Email Not Found"));
  }
  const isMatch = await Bcrypt.comparePass(req.body.password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 31556926,
    });
    return res.status(202).json({
      success: true,
      token: `Bearer ${token}`,
    });
  } else {
    next(new ErrorHandler(406, "Password Incorrect"));
  }
});
