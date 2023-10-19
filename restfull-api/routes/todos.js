const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const todo = require("../models/todo");
const Joi = require("joi");

//getting one
router.get("/:id", async (req, res) => {
  // res.json(res.todo);
  let result;
  try {
    result = await Todo.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json(result);
});

//getting all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//creating one
router.post("/", async (req, res) => {
  //name validation
  const { error } = validateTodoName(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //
  const todo = new Todo({
    name: req.body.name,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//deleting one
router.delete("/:id", getTodo, async (req, res) => {
  let result;
  try {
    result = await Todo.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "cannot find todo" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await result.deleteOne();
  res.json({ message: "Deleted" });
});

//updating one
router.patch("/:id", getTodo, async (req, res) => {
  let result;
  result = await Todo.findById(req.params.id);
  if (!result) {
    res.status(404).json({ message: "cannot find todo" });
  }
  //name validation
  const { error } = validateTodoName(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //
  if (req.body.name) {
    result.name = req.body.name;
  }
  try {
    const updatedTodo = await result.save();
    res.json(updatedTodo);
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

module.exports = router;
