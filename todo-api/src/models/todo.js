const Joi = require("joi");
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

function validateTodo(reqBody) {
  const schema = {
    name: Joi.string().min(3).max(256).required(),
    isDone: Joi.boolean(),
  };
  return Joi.validate(reqBody, schema);
}
module.exports.Todo = Todo;
module.exports.validate = validateTodo;
