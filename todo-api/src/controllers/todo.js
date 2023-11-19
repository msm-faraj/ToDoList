class TodoController {
  constructor(Todo, validator) {
    this.Todo = Todo;
    this.validator = validator;
  }

  async getAllTodos(req, res) {
    const page = req.query.page || 1;
    const prPage = req.query.prPage || 5;

    const todos = await this.Todo.find({ isDone: false, deletedAt: null })
      .sort({ createdAt: -1 })
      .skip((page - 1) * prPage)
      .limit(prPage);
    return res.json(todos);
  }

  async getOneTodo(req, res) {
    const todo = await this.Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "cannot find todo" });
    }
    return res.json(todo);
  }

  async createTodo(req, res) {
    const { error } = this.validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const todo = new this.Todo({
      name: req.body.name,
    });
    const newTodo = await todo.save();
    return res.status(201).json(newTodo);
  }

  async updateTodo(req, res) {
    const todo = await this.Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "cannot find todo" });
    }
    const { error } = this.validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (req.body.name) {
      todo.name = req.body.name;
    }
    if (req.body.isDone) {
      todo.isDone = req.body.isDone;
    }
    const updatedTodo = await todo.save();
    return res.json(updatedTodo);
  }

  async deleteTodo(req, res) {
    const todo = await this.Todo.findById(req.params.id);
    if (!todo) {
      return res.status(204).end();
    }
    todo.deletedAt = new Date();
    await todo.save();

    return res.status(204).json({ message: "deleted" });
  }
}

module.exports = TodoController;
