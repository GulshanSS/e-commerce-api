const { User, Product } = require("../models");
const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");

module.exports = {
  userGetAll: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      return res.status(404).json({ msg: "Error while fetching all users" });
    }
  },
  userGetOne: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(404).json({ msg: "No such user with that id" });
    }
  },
  userDelete: async (req, res) => {
    try {
      const user = User.findById({ _id: req.params.id });
      await user.remove();
      return res.status(200).json({ msg: "User deleted Successfully" });
    } catch (err) {
      return res.status(404).json({ msg: "Error while deleting user" });
    }
  },
  userCart: (req, res) => {
    try {
      let cart = [];
      req.user.cart.forEach(async (ele, i) => {
        cart.push(await Product.findById(ele));
      });
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(404).json({ msg: "No Products added to cart" });
    }
  },
  userAddToCart: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (
        user.cart.find((ele) => req.params.id.toString() === ele.toString())
      ) {
        return res
          .status(200)
          .json({ msg: "Product Already Available in the cart" });
      }
      if (!user.cart) {
        user.cart.push(req.params.id);
      } else {
        user.cart.push(req.params.id);
      }
      await User.findByIdAndUpdate(req.user._id, {
        $set: {
          cart: user.cart,
        },
      });
      return res.status(202).json({ msg: "Product added to cart" });
    } catch (err) {
      return res.status(404).json({ msg: "Failed to add to cart" });
    }
  },
  userOrder: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (
        user.cart.find((ele) => req.params.id.toString() === ele.toString())
      ) {
        user.cart = [...user.cart].filter(
          (ele) => req.params.id.toString() != ele.toString()
        );
      }
      user.order.push(req.params.id);
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            order: user.order,
            cart: user.cart,
          },
        }
      );
      const product = await Product.findById(req.params.id);
      return res.status(202).json({
        msg: "Product bought",
        Summary: {
          name: `${product.name}`,
          price: "Rs " + `${product.price}`,
        },
      });
    } catch (err) {
      return res.status(404).json({ msg: "Unable to buy this product" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const isMatch = await bcrypt.compare(
        req.body.oldpassword,
        req.user.password
      );
      if (isMatch) {
        if (req.body.oldpassword === req.body.newpassword) {
          return res
            .status(400)
            .json({ msg: "You can't set same password again" });
        }
        hash = await bcrypt.hash(req.body.newpassword, 10);
        const user = await User.findByIdAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              password: hash,
            },
          }
        );
        req.user = user;
        return res.status(200).json({ msg: "Password reset sucessful!" });
      } else {
        return res.status(404).json({ msg: "Invalid old password" });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ msg: "Couldn't reset the password, try again" });
    }
  },
  likeProduct: async (req, res) => {
    try {
      let updatedUsers = [];
      const product = await Product.findById(req.params.id);
      if (
        product.likes.users.find(
          (ele) => req.user._id.toString() === ele.toString()
        )
      ) {
        product.likes.count -= 1;
        updatedUsers = [...product.likes.users].filter(
          (ele) => req.user._id.toString() != ele.toString()
        );
      } else {
        product.likes.count += 1;
        updatedUsers.push(req.user._id);
      }
      product.likes.users = updatedUsers;
      await product.save();
      return res.status(201).json(product);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "Error while liking the product" });
    }
  },
};
