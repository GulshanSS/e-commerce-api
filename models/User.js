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
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default: "user",
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        required: true
    }
})

module.exports = mongoose.model("user", UserSchema);
