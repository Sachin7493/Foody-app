const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

router.get("/foodData", async (req, res) => {
  try {
    const foodData = await FoodItem.find({}, { _id: 0, _v: 0 });
    res.json(foodData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
