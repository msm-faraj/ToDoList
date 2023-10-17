const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const todo = require("../models/todo");
const Joi = require("joi");

//getting all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

//creating one
router.post("/", async (req, res) => {
  //name validation
  const { error } = validateTodoName(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //
  const todo = new Todo({
    name: req.body.name,
    todoDate: req.body.todoDate,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//updating one ********* ***** ***** ****
router.patch("/:id", getTodo, async (req, res) => {
  //name validation
  const { error } = validateTodoName(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //
  if (req.body.name) {
    res.todo.name = req.body.name;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//deleting one
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Validate Todo fuction
function validateTodoName(todoName) {
  const schema = {
    name: Joi.string().min(3).max(256).required(),
  };
  return Joi.validate(todoName, schema);
}

//getTodo middleWare
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;
