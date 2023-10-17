const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    match: /^\w{0,256}$/,
    required: true,
    trim: true,
  },
  createdAt: {
    //how to make it immutable!!!??
    type: Date,
    default: Date.now,
  },
  todoDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
