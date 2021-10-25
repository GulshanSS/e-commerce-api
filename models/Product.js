const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  img: {
    cloudinary_ID: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
  },
  section: {
    type: [],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", ProductSchema);
