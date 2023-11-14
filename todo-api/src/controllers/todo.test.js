const Controler = require("./todo");

describe("TodoController", () => {
  describe("getOneTodo", () => {
    let res;
    let req;
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
