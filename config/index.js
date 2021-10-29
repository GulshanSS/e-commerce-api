const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

module.exports.DBConfig = () => {
  mongoose.connect(process.env.DB_URL, (err, db) => {
    if (err) return res.status(503).json({ msg: "DB server unavailable" });
  });
};

module.exports.CloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
