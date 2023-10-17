require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error.text));
db.once("open", () => console.log("Connecting to DataBase"));

app.use(express.json());

const tdosRouter = require("./routes/todos");
app.use("/api/todos", tdosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
