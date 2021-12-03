const Validator = require("validator");
const isEmpty = require("is-empty");
const { User } = require("../../models");
const { Validation } = require("../../utils");

module.exports = {
  validateRegisterInput: async (req, res, next) => {
    let errors = {};
    req.body.name = Validation.sanitizeAndValidate(req.body.name);
    req.body.email = Validation.sanitizeAndValidate(req.body.email);
    //req.body.dob = Validation.sanitizeAndValidate(req.body.dob);
    req.body.mobile = Validation.sanitizeAndValidate(req.body.mobile);
    req.body.password = Validation.sanitizeAndValidate(req.body.password);
    req.body.address = Validation.sanitizeAndValidate(req.body.address);
    req.body.gender = Validation.sanitizeAndValidate(req.body.gender);

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
        "Password must 8 characters long -" +
        "Must contain 1 atleast lowercase character -" +
        "Must contain 1 atleast uppercase character -" +
        "Must contain 1 atleast number -" +
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
    if (new Date().getTime() < req.body.dob) {
      errors.dob = "Please enter valid Date of birth";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
  validateLoginInput: (req, res, next) => {
    let errors = {};
    req.body.email = Validation.sanitizeAndValidate(req.body.email);
    if (!Validator.isEmail(req.body.email)) {
      errors.email = "Email is not valid";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
  validateResetPassword: (req, res, next) => {
    let errors = {};
    req.body.oldpassword = Validation.sanitizeAndValidate(req.body.oldpassword);
    req.body.newpassword = Validation.sanitizeAndValidate(req.body.newpassword);
    req.body.confirmpassword = Validation.sanitizeAndValidate(
      req.body.confirmpassword
    );

    if (Validator.isEmpty(req.body.oldpassword)) {
      errors.oldpassword = "Old password filed can not be empty";
    }
    if (Validator.isEmpty(req.body.newpassword)) {
      errors.newpassword = "New password field can not be empty";
    } else if (!Validator.isStrongPassword(req.body.newpassword)) {
      errors.newpassword =
        "Password must 8 characters long and" +
        "Must contain 1 atleast lowercase character and" +
        "Must contain 1 atleast uppercase character and" +
        "Must contain 1 atleast number and" +
        "Must contain 1 atleast special symbol character";
    }
    if (Validator.isEmpty(req.body.confirmpassword)) {
      errors.confirmpassword = "Confirm field can not be empty";
    } else if (req.body.newpassword != req.body.confirmpassword) {
      errors.confirmpassword = "Password and it's confirmation doesn't match";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },

  validatePassword: (req, res, next) => {
    let errors = {};
    req.body.password = Validation.sanitizeAndValidate(req.body.password);
    if (Validator.isEmpty(req.body.password)) {
      errors.password = "New password field can not be empty";
    } else if (!Validator.isStrongPassword(req.body.password)) {
      errors.password =
        "Password must 8 characters long \n" +
        "Must contain 1 atleast lowercase character \n" +
        "Must contain 1 atleast uppercase character \n" +
        "Must contain 1 atleast number \n" +
        "Must contain 1 atleast special symbol character";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
};
