const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 1,
            max: 30,
            required: [true, "Type your name here."]
        },
        email: {
            type: String,
            required: [true, "Please enter your email here."],
        },
        password: {
            type: String,
            min: 8,
            max: 32,
            required: [true, "Password, minimun 8 and max 32 characters long."]
        }, 
    },
    
);

const User = mongoose.model("User", UserSchema);

module.exports = User;