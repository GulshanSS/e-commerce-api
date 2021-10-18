const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  userRegister: (req, res) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        return hash;
      })
      .then((hash) => {
        return (user = new User({
          name: req.body.name,
          email: req.body.email,
          dob: Date.now(),
          mobile_no: req.body.mobile,
          password: hash,
          address: req.body.address,
          gender: req.body.gender,
        })).save();
      })
      .then((user) => {
        console.log(user);
        return res.status(201).json({ msg: "user Added successfully" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error while adding user" });
      });
  },
  userLogin: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (result) {
          return res.status(201).json({ msg: "User logged in sucessfully" });
        } else {
          return res.status(404).json({ msg: "Login with proper Credentials" });
        }
      })
      .catch(() => {
        return res.status(404).json({ msg: "User not found" });
      });
  },
};
