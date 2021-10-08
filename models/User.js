const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("user", UserSchema);
