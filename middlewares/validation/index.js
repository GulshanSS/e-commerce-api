const { validateProduct, productCheck } = require("./ProductValidation");
const {
  validateRegisterInput,
  validateLoginInput,
  validateResetPassword,
  validatePassword,
} = require("./UserValidation");

module.exports = {
  validateProduct,
  productCheck,
  validateRegisterInput,
  validateLoginInput,
  validateResetPassword,
  validatePassword,
};
