const Todo = require("../models/todo-schema");
const Joi = require("joi");

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
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        res.status(404).json({ message: "cannot find todo" });
        res.json(todo);
      }
    } catch (err) {
      next(err);
    }
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
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "cannot find todo" });
      }
      const { error } = validateTodoName(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      if (req.body.name) {
        todo.name = req.body.name;
      }
      if (req.body.isDone) {
        todo.isDone = req.body.isDone;
      }
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        res.status(204).end();
        await todo.deleteOne();
        res.status(204).end;
      }
    } catch (err) {
      next(err);
    }
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
