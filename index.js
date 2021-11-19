const express = require("express");
const passport = require("passport");
const app = express();

const cors = require("cors");
const config = require("./config");
const { createAdmin } = require("./middlewares/auth");
const Admin = require("./routes/Admin");
const Customer = require("./routes/Customer");
const Vendor = require("./routes/Vendor");
const Public = require("./routes/Public");
const { AuthRoutes } = require("./routes/Auth");

require("dotenv").config();

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(passport.initialize());
require("./config/passport")(passport);

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

app.listen(process.env.PORT || 3000);
