const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  Register: async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        dob: Date.now(),
        mobile_no: req.body.mobile,
        password: hash,
        address: req.body.address,
        gender: req.body.gender,
      });
      await user.save();
      return res.status(201).json({ msg: "user Added successfully" });
    } catch (err) {
      return res.status(404).json({ msg: "Cannot register the user..!" });
    }
  },
  Login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Email not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          id: user.id,
          role: user.role,
        };
        const { err, token } = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 31556926,
        });
        return res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
        });
      } else {
        return res.status(400).json({ msg: "Password Incorrect" });
      }
    } catch (err) {
      return res.status(404).json({ msg: "User not found" });
    }
  },
};
