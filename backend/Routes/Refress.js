const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/refress", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const newToken = jwt.sign(
      { email: user.email, name: user.name },
      process.env.KEY,
      { expiresIn: "5h" }
    );
    res.cookie("token", newToken, { httpOnly: true, maxAge: 36000 });
    res.json({ status: true, token: newToken });
  });
});

module.exports = router;
