const { User } = require("../models");

module.exports = {
  userGetAll: (req, res) => {
    User.find({})
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error while fetching all users" });
      });
  },
  userGetOne: (req, res) => {
    User.findById({ _id: req.params.id })
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(404).json({ msg: "No such user with that id" });
      });
  },
  userDelete: (req, res) => {
    User.findById({ _id: req.params.id })
      .then((users) => {
        users.remove();
        return res.status(200).json({ msg: "User deleted Successfully" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error while deleting user" });
      });
  },
};
