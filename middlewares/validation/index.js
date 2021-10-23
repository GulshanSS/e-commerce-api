const { validateProduct, productCheck } = require("./ProductValidation");
const {
  validateRegisterInput,
  validateLoginInput,
  validateResetPassword,
} = require("./UserValidation");

module.exports = {
  validateProduct,
  productCheck,
  validateRegisterInput,
  validateLoginInput,
  validateResetPassword,
};
