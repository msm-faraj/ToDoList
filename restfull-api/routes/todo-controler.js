const Todo = require("../models/todo-schema");
const Joi = require("joi");
const tryCatckMiddleware = require("../middleware/async-try-catch");

class TodoController {
  constructor() {}

  async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getOneTodo(req, res, next) {
    let asyncResult;
    try {
      asyncResult = await Todo.findById(req.params.id);
      if (!asyncResult) {
        return res.status(404).json({ message: "cannot find todo" });
      }
    } catch (err) {
      next(err);
    }
    res.json(asyncResult);
  }

  async createTodo(req, res, next) {
    try {
      const { error } = validateTodoName(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const todo = new Todo({
        name: req.body.name,
      });
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req, res, next) {
    let asyncResult;
    try {
      asyncResult = await Todo.findById(req.params.id);
      if (!asyncResult) {
        return res.status(404).json({ message: "cannot find todo" });
      }
      const { error } = validateTodoName(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      if (req.body.name) {
        asyncResult.name = req.body.name;
      }
      if (req.body.isDone) {
        asyncResult.isDone = req.body.isDone;
      }
      const updatedTodo = await asyncResult.save();
      res.json(updatedTodo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    let asyncResult;
    try {
      asyncResult = await Todo.findById(req.params.id);
      if (!asyncResult) {
        return res.status(404).json({ message: "cannot find todo" });
      }
    } catch (err) {
      next(err);
    }
    await asyncResult.deleteOne();
    res.json({ message: "Deleted" });
  }
}

function validateTodoName(todoName) {
  const schema = {
    name: Joi.string().min(3).max(256).required(),
    isDone: Joi.boolean(),
  };
  return Joi.validate(todoName, schema);
}

module.exports = TodoController;
