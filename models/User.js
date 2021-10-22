const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  mobile_no: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: {
    type: String,
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  order: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
    default: "O",
  },
});

module.exports = mongoose.model("user", UserSchema);
