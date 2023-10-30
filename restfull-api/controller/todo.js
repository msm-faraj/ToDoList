const Todo = require("../models/todo");
const validator = require("../modules/validator");

class TodoController {
  constructor(TodoP, validatorP) {
    // this.Todo = TodoP;
    // this.validator = validatorP;
  }

  async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.find();
      return res.json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getOneTodo(req, res, next) {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "cannot find todo" });
      }
      return res.json(todo);
    } catch (err) {
      next(err);
    }
  }

  async createTodo(req, res, next) {
    try {
      const { error } = validator(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const todo = new Todo({
        name: req.body.name,
      });
      const newTodo = await todo.save();
      return res.status(201).json(newTodo);
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
      const { error } = validator(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      if (req.body.name) {
        todo.name = req.body.name;
      }
      if (req.body.isDone) {
        todo.isDone = req.body.isDone;
      }
      const updatedTodo = await todo.save();
      return res.json(updatedTodo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(204).end();
      }
      await todo.deleteOne();
      return res.status(404).json({ message: "deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;
