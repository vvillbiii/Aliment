const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 1,
            max: 30,
            required: [true, "Type your name here."],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please enter your email here."],
            unique: true,
        },
        password: {
            type: String,
            min: 8,
            max: 32,
            required: [true, "Password, minimun 8 and max 32 characters long."]
        }, 
        image: {
            type: String,
            require: [true, " Please upload your photo."]
        },
        //relationship to User
        review: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Review",},
    },
    {
        timestamps: true,
    }
    
);

const User = mongoose.model("User", userSchema);

module.exports = User;
