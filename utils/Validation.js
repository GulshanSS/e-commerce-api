const isEmpty = require("is-empty");
const Validator = require("validator");

exports.sanitizeAndValidate = (data) => {
  return !isEmpty(data) ? Validator.trim(Validator.escape(data)) : "";
};

exports.emptyField = (errors, data) => {
  if (Validator.isEmpty(data)) {
    errors.Empty = "Old password filed can not be empty";
  }
  return errors;
};

exports.Email = (errors, data) => {
  if (!Validator.isEmail(data)) {
    errors.email = "Email is not valid";
  }
  return errors;
};

exports.Password = (errors, data) => {
  if (!Validator.isStrongPassword(data)) {
    errors.Password =
      "Password must 8 characters long and" +
      "Must contain 1 atleast lowercase character and" +
      "Must contain 1 atleast uppercase character and" +
      "Must contain 1 atleast number and" +
      "Must contain 1 atleast special symbol character";
  }
  return errors;
};

exports.mobile = (errors, data) => {
  if (!Validator.isNumeric(data)) {
    errors.mobile = "Enter number in numerics";
  } else if (!Validator.isMobilePhone(data)) {
    errors.mobile = "Mobile Number must be atleast 10 number long";
  }
  return errors;
};


