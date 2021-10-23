const { User, Product } = require("../models");

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
      if (req.user.cart.find((ele) => req.params.id.equals(ele))) {
        return res
          .status(200)
          .json({ msg: "Product Already Available in the cart" });
      }
      if (!req.user.cart) {
        req.user.cart.push(req.user._id);
      } else {
        req.user.push(req.user._id);
      }
      await User.findByIdAndUpdate(req.user._id, {
        $set: {
          cart: req.user.cart,
        },
      });
      return res.status(202).json({ msg: "Product added to cart" });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: "Failed to add to cart" });
    }
  },
  userOrder: async (req, res) => {
    try {
      if (req.user.cart.find((ele) => req.params.id.equals(ele))) {
        req.user.cart = [...req.user.cart].filter(
          (ele) => !req.params.id.equals(ele)
        );
      }
      req.user.order.push(req.params.id);
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            order: req.user.order,
            cart: product.cart,
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
};
