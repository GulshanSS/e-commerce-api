const express = require("express");
const app = express();

const config = require("./config");
const { ProductRoutes, UserRoutes } = require("./routes");

require("dotenv").config();
const PORT = process.env.PORT;

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());

app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);

app.listen(PORT || 3000, () => {
    console.log(`Server Started at ${PORT}`);
});
