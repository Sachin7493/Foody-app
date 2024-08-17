const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;
dotenv.config();

const UserRouter = require("./Routes/CreateUser");
const DisplayRouter = require("./Routes/DisplayData");
const DataRouter = require("./Routes/OrderData");
const MyOrderRouter = require("./Routes/Myorder");

const app = express();
app.use(express.json());

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(cookieParser());
app.use("/api", UserRouter);
app.use("/api", DisplayRouter);
app.use("/api", DataRouter);
app.use("/api", MyOrderRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/food")
  .then(console.log("MongoDB connected"));

app.listen(port, () => {
  console.log(`Server successfully started on port ${port}`);
});
