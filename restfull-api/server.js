require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error.text));
db.once("open", () => console.log("Connecting to DataBase"));

app.listen(3000, () => console.log("Server Started"));
