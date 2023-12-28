const error = require("./middleware/err-handler");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todosRouter = require("./routes/todos");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/todos", todosRouter);
app.use(error);

let db = "test";
mongoose.connect(`mongodb://db:27017/${db}`);

mongoose.connection.on("error", (error) => console.error(error.text));
mongoose.connection.once("open", () =>
  console.log(`Connected to ${db} Database...`)
);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
