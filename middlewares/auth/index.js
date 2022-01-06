const { authorize, verifiedEmail } = require("./Access");
const { createAdmin } = require("./AdminGenerate");

module.exports = {
  authorize,
  verifiedEmail,
  createAdmin,
};
