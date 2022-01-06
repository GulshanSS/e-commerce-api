const mongoose = require("mongoose");

const DB = () => {
  mongoose.connect(process.env.DB_URL, (err, db) => {
    if (err) return res.status(503).json({ msg: "DB server unavailable" });
  });
};

module.exports = DB;
