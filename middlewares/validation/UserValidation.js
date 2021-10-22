const Validator = require("validator");
const isEmpty = require("is-empty");
const { User } = require("../../models");

module.exports = {
  validateRegisterInput: async (req, res, next) => {
    let errors = {};
    req.body.name = !isEmpty(req.body.name)
      ? Validator.trim(Validator.escape(req.body.name))
      : "";
    req.body.email = !isEmpty(req.body.email)
      ? Validator.trim(req.body.email)
      : "";
    // req.body.dob = !isEmpty(req.body.dob) ? Validator.trim(req.body.dob) : "";
    req.body.mobile = !isEmpty(req.body.mobile)
      ? Validator.trim(req.body.mobile)
      : "";
    req.body.password = !isEmpty(req.body.password)
      ? Validator.trim(req.body.password)
      : "";
    req.body.address = !isEmpty(req.body.address)
      ? Validator.trim(Validator.escape(req.body.address))
      : "";
    req.body.gender = !isEmpty(req.body.gender) ? req.body.gender : "";

    //Name checks
    if (Validator.isEmpty(req.body.name)) {
      errors.name = "Name is required";
    }

    //Email Check
    const email = await User.findOne({ email: req.body.email });
    if (Validator.isEmpty(req.body.email)) {
      errors.email = "Email is required";
    } else if (!Validator.isEmail(req.body.email)) {
      errors.email = "Email is not valid";
    } else if (!isEmpty(email)) {
      errors.email = "Email already exist";
    }

    //Password Check
    if (Validator.isEmpty(req.body.password)) {
      errors.password = "Password is required";
    } else if (!Validator.isStrongPassword(req.body.password)) {
      errors.password =
        "Password must 8 characters long and" +
        "Must contain 1 atleast lowercase character and" +
        "Must contain 1 atleast uppercase character and" +
        "Must contain 1 atleast number and" +
        "Must contain 1 atleast special symbol character";
    }

    //Mobile Number Check
    if (Validator.isEmpty(req.body.mobile)) {
      errors.mobile = "Mobile number is required";
    } else if (!Validator.isNumeric(req.body.mobile)) {
      errors.mobile = "Enter number in numerics";
    } else if (!Validator.isMobilePhone(req.body.mobile)) {
      errors.mobile = "Mobile Number must be atleast 10 number long";
    }

    //Address Check
    if (Validator.isEmpty(req.body.address)) {
      errors.address = "Please provide the Address";
    }

    //Date Check
    //   if(Date.now() < req.body.dob || Validator.isDate(req.body.dob,['/','-']){
    //       errors.dob = "Please enter valid Date of birth"
    //   }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
  validateLoginInput: (req, res, next) => {
    let errors = {};
    req.body.email = !isEmpty(req.body.email)
      ? Validator.trim(req.body.email)
      : "";
    if (!Validator.isEmail(req.body.email)) {
      errors.email = "Email is not valid";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
};
