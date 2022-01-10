const mongoose = require("mongoose");
const Token = require("./Token");
const crypto = require("crypto");

const { Bcrypt, Email } = require("../utils");
const ErrorHandler = require("../utils/errorHandler");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be atleast 3 characters long."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (e) {
        return e.match("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      },
      message: "Email is not in proper format",
    },
    unique: true,
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: String,
    required: [true, "Mobile No. is required"],
    validate: {
      validator: function (m) {
        return m.match("^[0-9]{10}$");
      },
      message: "Mobile No. must contain 10 digits",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (p) {
        return p.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
      },
      message:
        "Password must contain atleast 1 lowercase, 1 uppercase & 1 special characters & 1 numeric digit",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "vendor"],
    default: "user",
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [10, "Address is invalid"],
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
  order: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
    default: "O",
  },
  deleteApproval: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await Bcrypt.genHash(
    this.password || process.env.ADMIN_PASS,
    10
  );
  next();
});

UserSchema.post("save", async function (err, doc, next) {
  if (err.name === "MongoServerError" && err.code === 11000) {
    next(new ErrorHandler(406, "Email already registered"));
  }
  next();
});

UserSchema.methods.generateVerificationLink = async function (
  id,
  email,
  msg,
  linkroute,
  btnText
) {
  let token = await Token.findOne({ userId: id });
  if (!token) {
    token = await new Token({
      userId: id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }
  const link = `${linkroute}/${id}/${token.token}`;
  await Email.SendEmail(email, msg, link, btnText);
};

module.exports = mongoose.model("user", UserSchema);
