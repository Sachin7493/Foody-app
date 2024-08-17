const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const jwt = require("jsonwebtoken");

router.post("/orderData", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;

    const { orderData } = req.body;
    if (!orderData || orderData.length === 0) {
      return res.status(400).json({ message: "No order data provided" });
    }
    let order = await Order.findOne({ email });
    if (order) {
      order.order_data.push(...orderData);
    } else {
      order = new Order({ email, order_data: orderData });
    }
    await order.save();
    res.status(200).json({ message: "Order saved Successfully" });
  } catch (error) {
    console.error("Error saving order", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
