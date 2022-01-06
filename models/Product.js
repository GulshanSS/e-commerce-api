const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Minimum price is Rs. 0"],
  },
  details: {
    type: String,
    required: [true, "Description is required"],
  },
  img: {
    cloudinary_ID: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
    ref: "user",
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
    type: String,
    required: [true, "Section is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", ProductSchema);
