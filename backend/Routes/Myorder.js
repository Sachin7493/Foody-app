const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const jwt = require("jsonwebtoken");

router.get("/myOrders", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;
    const orders = await Order.findOne({ email: email });
    if (!orders) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json({ orders: orders.order_data });
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/cancel", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;
    const { orderName } = req.body;
    if (!orderName) {
      return res.status(400).json({ message: "Order name is required" });
    }

    const order = await Order.findOne({ email });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = order.order_data.filter(
      (item) => item.name !== orderName
    );

    order.order_data = updatedOrder;
    await order.save();
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
