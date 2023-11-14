const Todo = require("../src/models/todo");
const validate = require("../src/modules/validator");
const Controler = require("../src/controllers/todo");
const controler = new Controler(Todo, validate);

describe("TodoController", () => {
  describe("getOneTodo", () => {
    it("should return a todo with the given valid associated id", async () => {
      const req = { params: { id: "65438ace7df7d6ac23b7237b" } };
      const res = {
        status: jest
          .fn()
          .mockReturnValueOnce({ id: "65438ace7df7d6ac23b7237b" }),
      };
      // 1. mock 		this.Todo.findById(req.params.id);
      // 2. mock 		return res.status(404).json({ message: "cannot find todo" });

      const result = await controler.getOneTodo(req, res);
      expect(result).toBe(z);
    });
  });
});

/*
class TodoController {
  constructor(Todo, validator) {
    this.Todo = Todo;
    this.validator = validator;
  }
  async getOneTodo(req, res) {
    const todo = await this.Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "cannot find todo" });
    }
    return res.json(todo);
  }
}
*/
