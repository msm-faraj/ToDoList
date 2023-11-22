const TodoController = require("./todo");
const Controler = require("./todo");
let req;
let res;
let page;
let prPage;
let todo;
let todos;
let Todo;
let error;
let mockSort;
let mockSkip;
let mockLimit;
let mockEnd;
let validator;
let mockSend;
let updatedTodo;
let mockSave;
let newTodo;
let mockValidator;

describe("TodoController", () => {
  describe("getAllTodos", () => {
    describe("when everything is successful", () => {
      beforeEach(async () => {
        page = 1;
        prPage = 5;
        req = { query: { page, prPage } };
        res = {
          json: jest.fn(),
        };
        const filter = { isDone: false, deletedAt: null };
        mockLimit = { limit: jest.fn() };
        mockSkip = { skip: jest.fn().mockReturnValueOnce(mockLimit) };
        mockSort = { sort: jest.fn().mockReturnValueOnce(mockSkip) };
        Todo = { find: jest.fn().mockReturnValueOnce(mockSort) };
        const validate = {};
        const controler = new Controler(Todo, validate);
        await controler.getAllTodos(req, res);
      });
      it("should call .find with correct parameters", () => {
        expect(Todo.find).toHaveBeenCalledWith({
          isDone: false,
          deletedAt: null,
        });
      });
      it("should call .sort with correct parameters", () => {
        expect(mockSort.sort).toHaveBeenCalledWith({ createdAt: -1 });
      });
      it("should call .skip with correct parameters", () => {
        expect(mockSkip.skip).toHaveBeenCalledWith((page - 1) * prPage);
      });
      it("should call .limit with correct parameters", () => {
        expect(mockLimit.limit).toHaveBeenCalledWith(prPage);
      });
      it("should call res.json with correct parameters", () => {
        expect(res.json).toHaveBeenCalledWith(todos);
      });
    });
  });
  describe("getOneTodo", () => {
    describe("when everything is successful", () => {
      beforeEach(async () => {
        const id = "65438ace7df7d6ac23b7237b";
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(todo),
        };
        const validator = {};
        const controler = new Controler(Todo, validator);

        req = { params: { id } };
        res = {
          json: jest.fn(),
        };

        await controler.getOneTodo(req, res);
      });
      it("should call findById with correct parameters", async () => {
        expect(Todo.findById).toHaveBeenCalledWith(req.params.id);
      });
      it("should call res.json with correct parameters", async () => {
        expect(res.json).toHaveBeenCalledWith(todo);
      });
    });
    describe("when todo does not exist in the dtabase", () => {
      beforeEach(async () => {
        const id = "65438ace7df7d6ac23b7237b";
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(null),
        };
        req = { params: { id } };
        mockEnd = { json: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockEnd),
        };

        const validator = {};
        const controler = new Controler(Todo, validator);
        await controler.getOneTodo(req, res);
      });
      it("should call res.status with correct paramaters(404)", () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });
      it("should call .json with correct parameters", () => {
        expect(mockEnd.json).toHaveBeenCalledWith({
          message: "cannot find todo",
        });
      });
    });
  });
  describe("createTodo", () => {
    describe("when validator throw an error", () => {
      beforeEach(async () => {
        req = { body: { name: "somename" } };
        error = { details: [{ message: "someMmessage" }, "string"] };
        validator = jest.fn().mockReturnValueOnce({
          error: error,
        });
        const controler = new Controler(Todo, validator);
        mockSend = { send: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockSend),
        };
        await controler.createTodo(req, res);
      });
      it("should call vlidator with correct parameters", () => {
        expect(validator).toHaveBeenCalledWith(req.body);
      });
      it("shoult call res.status with correct parameters(400)", () => {
        expect(res.status).toHaveBeenCalledWith(400);
      });
      it("should call .send with correct parameters", () => {
        expect(mockSend.send).toHaveBeenCalledWith(error.details[0].message);
      });
    });
    describe("when given data is valid to create a new todo", () => {
      beforeEach(async () => {
        req = { body: { name: "somename" } };
        Todo = jest.fn().mockReturnValueOnce({ save: jest.fn() });
        validator = jest.fn().mockReturnValueOnce({
          error: null,
        });
        const controler = new Controler(Todo, validator);
        mockEnd = { json: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockEnd),
        };
        await controler.createTodo(req, res);
      });
      it("should call .Todo to create a new todo", () => {
        expect(Todo).toHaveBeenCalledWith({ name: req.body.name });
      });
      it("should call .save to save new todo", () => {
        expect(todo.save).toHaveBeenCalled;
      });
      it("should call .status with correct parameters", () => {
        expect(res.status).toHaveBeenCalled;
      });
      it("should call res.json with correct paramaters", () => {
        expect(mockEnd.json).toHaveBeenCalledWith(newTodo);
      });
    });
  });
  describe("updateTodo", () => {
    describe("when todo does not exist in the database", () => {
      beforeEach(async () => {
        let id;
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(null),
        };
        req = { params: { id } };
        mockEnd = { json: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockEnd),
        };

        const validator = {};
        const controler = new Controler(Todo, validator);
        await controler.updateTodo(req, res);
      });
      it("should call res.status with correct paramaters(404)", () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });
      it("should call .json with correct parameters", () => {
        expect(mockEnd.json).toHaveBeenCalledWith({
          message: "cannot find todo",
        });
      });
    });
    describe("when validator throw an error", () => {
      beforeEach(async () => {
        let id;
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(1),
        };
        req = { body: { name: "somename" }, params: { id } };
        error = { details: [{ message: "someMmessage" }, "string"] };
        validator = jest.fn().mockReturnValueOnce({
          error: error,
        });
        const controler = new Controler(Todo, validator);
        mockSend = { send: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockSend),
        };
        await controler.updateTodo(req, res);
      });
      it("should call vlidator with correct parameters", () => {
        expect(validator).toHaveBeenCalledWith(req.body);
      });
      it("shoult call res.status with correct parameters(400)", () => {
        expect(res.status).toHaveBeenCalledWith(400);
      });
      it("should call .send with correct parameters", () => {
        expect(mockSend.send).toHaveBeenCalledWith(error.details[0].message);
      });
    });
  });
  describe("deleteTodo", () => {
    describe("when todo does not exist in the dtabase", () => {
      beforeEach(async () => {
        const id = "65438ace7df7d6ac23b7237b";
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(null),
        };
        req = { params: { id } };
        mockEnd = { end: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockEnd),
        };

        const validator = {};
        const controler = new Controler(Todo, validator);
        await controler.deleteTodo(req, res);
      });
      it("should call res.status with correct paramaters(204)", () => {
        expect(res.status).toHaveBeenCalledWith(204);
      });
      it("should call .end with correct parameters", () => {
        expect(mockEnd.end).toHaveBeenCalled;
      });
    });
    describe("when given data is valid to delete", () => {
      beforeEach(async () => {
        let id = 1;
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(),
        };
        req = { body: { name: "somename" }, params: { id: id } };
        validator = jest.fn().mockReturnValueOnce({
          error: null,
        });
        const controler = new Controler(Todo, validator);
        mockEnd = { end: jest.fn().mockReturnValueOnce(), json: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockEnd),
        };
        await controler.deleteTodo(req, res);
      });

      it("should call .save to save new todo", () => {
        expect(todo.save).toHaveBeenCalled;
      });
      it("should call .status with correct parameters", () => {
        expect(res.status).toHaveBeenCalledWith(204);
      });
    });
  });
});
