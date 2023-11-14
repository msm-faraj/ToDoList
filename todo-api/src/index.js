const error = require("./middleware/err-handler");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todosRouter = require("./routes/todos");
require("dotenv").config();

app.use(express.json());
app.use("/api/todos", todosRouter);
app.use(error);

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("error", (error) => console.error(error.text));
mongoose.connection.once("open", () => console.log("Connected to Database..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));