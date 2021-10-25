const bcrypt = require("bcrypt");

exports.genHash = async (data) => {
  return await bcrypt.hash(data, process.env.SALT);
};

exports.comparePass = async (pass, hash) => {
  return await bcrypt.compare(pass, hash);
};
