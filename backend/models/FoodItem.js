const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: [
    {
      half: String,
      full: String,
      regular: String,
      medium: String,
      large: String,
    },
  ],
  description: String,
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
