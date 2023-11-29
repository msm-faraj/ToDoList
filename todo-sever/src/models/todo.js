const mongoose = require("mongoose");

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true,
      },
      isDone: {
        type: Boolean,
        default: false,
      },
      isImportant: {
        type: Boolean,
        default: false,
      },
      deletedAt: {
        type: Date,
        default: null,
      },
    },
    { timestamps: true }
  )
);

module.exports = Todo;
