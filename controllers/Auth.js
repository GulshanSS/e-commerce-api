const { Bcrypt } = require("../utils");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { Email } = require("../utils");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

module.exports = {
  Register: asyncHandler(async (req, res) => {
    const hash = await Bcrypt.genHash(req.body.password);
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.now,
      mobile_no: req.body.mobile,
      password: hash,
      address: req.body.address,
      gender: req.body.gender,
      role: req.body.role,
    }).save();
    await Email.generateVerificationLink(
      user._id,
      user.email,
      "Email Verification",
      "emailVerify",
      "Verify"
    );
    return res.status(201).json({
      msg: "Registered successfully and verification link sent to your registered mail account",
    });
  }),
  Login: asyncHandler(async (req, res) => {
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
  }),
};
