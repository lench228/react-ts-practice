const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const {GridFSBucket} = require("mongodb");

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
        const bd = await mongoose.connect(process.env.DB_URL);
        app.locals.bucket = new GridFSBucket(bd.connection.db);

        app.listen(process.env.PORT || 5000, () =>
            console.log(`Server started on port ${process.env.PORT || 5000}`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
