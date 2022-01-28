const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide your rating here."],
  },
  body: {
    type: String,
    required: [true, "Fill out your feedback here."],
  },
  //relationship to User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
