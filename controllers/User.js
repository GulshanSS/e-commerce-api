const { User } = require("../models");

module.exports = {
  userRegister: (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      dob: Date.now(),
      mobile_no: req.body.mobile,
      password: req.body.password,
      address: req.body.address,
      gender: req.body.gender,
    })
      .save()
      .then(() => {
        return res.status(201).json({ msg: "user Added successfully" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error while adding user" });
      });
  },
  userLogin: (req,res) => {
    const user = new User();
    if (
      (req.body.email === user.name) &
      (req.body.password === user.password)
    ) {
      return res.status(201).json({ msg: "User logged in sucessfully" });
    } else {
      return res.status(404).json({ msg: "Login with proper Credentials" });
    }
  },
};
