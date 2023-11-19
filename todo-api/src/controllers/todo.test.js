const Controler = require("./todo");

describe("TodoController", () => {
  describe("getAllTodos", () => {
    let req;
    let res;
    let page;
    let prPage;
    let todo;
    let todos;
    let Todo;
    let mockSort;
    let mockSkip;
    let mockLimit;

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
    let req;
    let res;
    let todo;
    let Todo;
    let mockJson;

    describe("when everything is successful", () => {
      beforeEach(async () => {
        const id = "65438ace7df7d6ac23b7237b";
        todo = { id };
        Todo = {
          findById: jest.fn().mockResolvedValueOnce(todo),
        };
        const validate = {};
        const controler = new Controler(Todo, validate);

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
        mockJson = { json: jest.fn() };
        res = {
          status: jest.fn().mockReturnValueOnce(mockJson),
        };

        const validate = {};
        const controler = new Controler(Todo, validate);
        await controler.getOneTodo(req, res);
      });
      it("should call res.status with correct paramatere", () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });
      it("should call .json with correct parameters", () => {
        expect(mockJson.json).toHaveBeenCalledWith({
          message: "cannot find todo",
        });
      });
    });
  });
});
