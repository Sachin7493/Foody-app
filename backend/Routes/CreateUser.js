const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const nodemailer = require("nodemailer");

router.post("/createuser", async (req, res) => {
  const { name, email, password, location } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exist" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newuser = new User({
    name,
    email,
    password: hashpassword,
    location,
  });
  await newuser.save();
  return res.json({ status: true, message: "record register" });
});

router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.KEY,
    {
      expiresIn: "5h",
    }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 36000 });
  return res.json({ status: true, message: "login successfully" });
});

module.exports = router;
