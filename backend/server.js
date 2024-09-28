const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
app.get("/api/test", (req, res) => {
  res.send("Test route is working");
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server started on port ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
