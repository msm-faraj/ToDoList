const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoText: {
    type: String,
    required: true,
  },
  todoDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
