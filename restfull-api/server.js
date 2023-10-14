const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://msm-faraj:5UHfNoVHRAPLjjQk@cluster0.ekykahb.mongodb.net/"
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error.text));
db.once("open", () => console.log("Connecting to DataBase"));

app.listen(3000, () => console.log("Server Started"));
