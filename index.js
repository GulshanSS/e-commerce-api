const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
require("dotenv").config();
const config = require("./config");
const { createAdmin } = require("./middlewares/auth");
const Admin = require("./routes/Admin");
const Customer = require("./routes/Customer");
const Vendor = require("./routes/Vendor");
const Public = require("./routes/Public");
const { AuthRoutes } = require("./routes/Auth");
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

config.DB();
config.Cloudinary();

app.use(passport.initialize());
config.Passport(passport);

app.use(createAdmin);

app.use("/api/admin", passport.authenticate("jwt", { session: false }), [
  Admin.UserRoutes,
]);
app.use("/api/customer", passport.authenticate("jwt", { session: false }), [
  Customer.UserRoutes,
]);
app.use("/api/vendor", passport.authenticate("jwt", { session: false }), [
  Vendor.ProductRoutes,
  Vendor.UserRoutes,
]);

app.use("/api", [AuthRoutes, Public.ProductRoutes]);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});
