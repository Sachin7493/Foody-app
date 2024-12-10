const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not register" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5h",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sachin74930@gmail.com",
        pass: "xyz...",
      },
    });
    var mailOptions = {
      from: "sachin74930@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };
    transporter.sendMail(mainOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("Invalid token");
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return re.json(err);
  }
};
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorised" });
});

module.exports = router;
