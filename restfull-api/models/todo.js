const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 256,
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
