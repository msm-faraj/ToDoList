require("dotenv").config();

const error = require("./middleware/error");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("error", (error) => console.error(error.text));
mongoose.connection.once("open", () => console.log("Connected to Database..."));

app.use(express.json());
app.use(error);

const tdosRouter = require("./routes/todos");
app.use("/api/todos", tdosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
