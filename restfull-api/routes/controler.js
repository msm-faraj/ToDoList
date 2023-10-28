const Todo = require("../models/todo");
const Joi = require("joi");

class TodoController {
  constructor() {}

  async getAllTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getOneTodo(req, res) {
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
  }

  async createTodo(req, res) {
    const { error } = validateTodoName(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const todo = new Todo({
      name: req.body.name,
    });
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateTodo(req, res) {
    let result;
    try {
      result = await Todo.findById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "cannot find todo" });
      }
      const { error } = validateTodoName(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      if (req.body.name) {
        result.name = req.body.name;
      }
      const updatedTodo = await result.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteTodo(req, res) {
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
  }
}

function validateTodoName(todoName) {
  const schema = {
    name: Joi.string().min(3).max(256).required(),
  };
  return Joi.validate(todoName, schema);
}

module.exports = TodoController;
