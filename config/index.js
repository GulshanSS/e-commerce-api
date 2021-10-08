const mongoose = require("mongoose");

module.exports.DBConfig = () => {
    mongoose.connect(
        process.env.DB_URL,
        () => {
            console.log("DB Connected");
        }
    );
};
