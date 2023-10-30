const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      match: /^.{0,256}$/,
      required: true,
      trim: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
