const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  Register: (req, res) => {
    User.findOne({ email: req.body.mail }, (err, user) => {
      if (!err) {
        return res.status(200).json({ msg: "Email Already Exists...." });
      }
    });
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        return hash;
      })
      .then((hash) => {
        return new User({
          name: req.body.name,
          email: req.body.email,
          dob: Date.now(),
          mobile_no: req.body.mobile,
          password: hash,
          address: req.body.address,
          gender: req.body.gender,
        }).save();
      })
      .then(() => {
        return res.status(201).json({ msg: "user Added successfully" });
      })
      .catch(() => {
        return res.status(404).json({ msg: "Cannot register the user..!" });
      });
  },
  Login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ msg: "Email not found" });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: 31556926,
              },
              (err, token) => {
                return res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            );
          } else {
            return res.status(400).json({ msg: "Password Incorrect" });
          }
        });
      })
      .catch(() => res.status(404).json({ msg: "User not found" }));
  },
};
