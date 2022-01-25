const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  number: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, min: 1, max: 5, required: true },
  description: { type: String, required: true },
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
