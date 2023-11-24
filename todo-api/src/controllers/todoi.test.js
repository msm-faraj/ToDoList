const request = require("supertest");
const Todo = require("../models/todo");
let server;

describe("/api/todos", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(async () => {
    server.close();
    await Todo.deleteMany();
  });
  describe("GET /", () => {
    beforeEach(async () => {
      await Todo.collection.insertMany([
        { name: "todo1", isDone: false, createdAt: "a" },
        { name: "todo2", isDone: false, createdAt: "b" },
        { name: "todo3", isDone: true, createdAt: "c" },
        { name: "todo4", isDone: false, createdAt: "d" },
        { name: "todo5", isDone: false, createdAt: "e" },
        { name: "todo6", isDone: false, createdAt: "f" },
        { name: "todo7", isDone: false, createdAt: "z" },
      ]);
    });
    it("should return status code 200 for valid get request", async () => {
      const res = await request(server).get("/api/todos?page=1&prPage=2");
      expect(res.status).toBe(200);
    });
    it("should find todos with given filter", async () => {
      const res = await request(server).get("/api/todos?page=1&prPage=7");
      expect(res.body.length).toBe(6);
    });
    it("should set page and per page by default", async () => {
      const res = await request(server).get("/api/todos");
      expect(res.body.length).toBe(5);
    });
    it("should sort finded todos with given parameters", async () => {
      const res = await request(server).get("/api/todos");
      expect(res.body[0].name).toBe("todo7");
    });
    it("should skip some of finded todos with given parameters", async () => {
      const res = await request(server).get("/api/todos?page=2&prPage=2");
      expect(res.body[1].name).toBe("todo4");
    });
    it("should limit finded todos with given parameters", async () => {
      const res = await request(server).get("/api/todos?page=1&prPage=3");
      expect(res.body.length).toBe(3);
    });
    it("should return status code 404 for ivlaid get request", async () => {
      const res = await request(server).get("/api/todos/1");
      expect(res.status).toBe(404);
    });
  });
  describe("Get /:id", () => {
    beforeEach(async () => {
      await Todo.collection.insertMany([
        {
          _id: "6560f4c703df451afb7827f7",
          name: "todo1",
          isDone: false,
          createdAt: "a",
        },
      ]);
    });
    it("should return 404 error if given id is not valid id", async () => {
      const res = await request(server).get("/api/todos/1");
      expect(res.status).toBe(404);
    });
    it("should return 404 error if given valid id is not associated with a todo in database", async () => {
      const res = await request(server).get(
        "/api/todos/65438ace7df7d6ac23b7237a"
      );
      expect(res.status).toBe(404);
    });
    it("should retunr todo if given id is a valid id of a todo in database", async () => {
      const res = await request(server).get(
        "/api/todos/6560f4c703df451afb7827f7"
      );
      expect(res.status).toBe(200);
    });
  });
  // describe("Post /", () => {
  //   it("should return 400 error if given todo is not valid", () => {});
  //   it("should save todo to the database if given todo is valid to save", () => {});
  //   it("should return the todo that just saved to the database", () => {});
  // });
  // describe("Patch /:id", () => {
  //   it("should return 404 error if given id is not associated with todod in database", () => {});
  //   it("should return 400 error if given todo is not valid", () => {});
  //   it("should change name prop of todo with given new name in the given req for update", () => {});
  //   it("should change isDone prop of todo with given new isDone in the given req for update", () => {});
  //   it("should return the todo that just update and saved to the database", () => {});
  // });
  // describe("Delete /:id", () => {
  //   it("should return 204 error if given id is not associated with todod in database", () => {});
  //   it("should define deleteAt prop for todo if given id is associated with a todod in database", () => {});
  //   it("should save todo to the database with new deltedAt prop", () => {});
  //   it("should return status code 204 after soft delete a todo", () => {});
  // });
});
