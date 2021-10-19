const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(req, res, next) {
  let errors = {};
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  // req.body.date = !isEmpty(req.body.date) ? req.body.date : "";
  req.body.mobile = !isEmpty(req.body.mobile) ? req.body.mobile : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";
  req.body.address = !isEmpty(req.body.address) ? req.body.address : "";
  req.body.gender = !isEmpty(req.body.gender) ? req.body.gender : "";
  //Name checks
  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(req.body.emaill)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 charactes long";
  }
  if (Validator.isEmpty(req.body.mobile)) {
    errors.password = "Mobile number is required";
  } else if (typeof req.body.mobile != "number") {
    errors.mobile = "Enter number in numerics";
  } else if (!Validator.isLength(req.body.mobile, { min: 10 })) {
    errors.password = "Mobile Number must be atleast 10 number long";
  }
  if (Validator.isEmpty(req.body.address)) {
    errors.password = "Please provide the Address";
  }
  //   if(Date.now() < req.body.dob){
  //       errors.dob = "Please enter valid Date of birth"
  //   }
  return isEmpty(errors) ? next() : res.status(404).json(errors);
};
