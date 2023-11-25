const request = require("supertest");
const Todo = require("../models/todo");
var mongoose = require("mongoose");
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
        { name: "todo1", isDone: false, createdAt: 1 },
        { name: "todo2", isDone: false, createdAt: 2 },
        { name: "todo3", isDone: true, createdAt: 3 },
        { name: "todo4", isDone: false, createdAt: 4 },
        { name: "todo5", isDone: false, createdAt: 5 },
        { name: "todo6", isDone: false, createdAt: 6 },
        { name: "todo7", isDone: false, createdAt: new Date(7000) },
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
      // expect(res.body[0].createdAt.getSeconds()).toBe(7);
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
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
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
        `/api/todos/6561ccc4c7f982b3fadaa535`
      );
      expect(res.status).toBe(200);
    });
  });
  describe("Post /", () => {
    it("should return 400 error if given todo has no name", async () => {
      const res = await request(server).post("/api/todos").send({});
      expect(res.status).toBe(400);
    });
    it("should return 400 error if given tods name has less tan 3 char", async () => {
      const res = await request(server).post("/api/todos").send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("should return 400 error if given tods name has more than 255 char", async () => {
      const res = await request(server).post("/api/todos").send({
        name: "1234573698798;sdlkfjg;sldfkgj;lsdkfjg;lsdkfjg;lakjfg;alksdfjg;lakjsd;lfajs;dlfkj;alskdjf;laksdjf;lakjsd;lfkj;alskdfj;laskdjf;laksjdlfkja;lskdjf76987698273465987236948576928374569283746598273465982736459872364985726394875692873465982734695872346958723694857692837465982376459872364598723649587263948756928734569283746",
      });
      expect(res.status).toBe(400);
    });
    it("should save todo to the database if given todo is valid to save", async () => {
      const res = await request(server)
        .post("/api/todos")
        .send({ name: "valid-name" });
      expect(res.status).toBe(201);
    });
  });
  describe("Patch /:id", () => {
    it("should return 404 error if given id is not valid id", async () => {
      const res = await request(server)
        .patch("/api/todos/1")
        .send({ name: "valid-name" });
      expect(res.status).toBe(404);
    });
    it("should return 404 error if given id is not associated with todod in database", async () => {
      const res = await request(server)
        .patch("/api/todos/6561ccc4c7f982b3fadaa535")
        .send({ name: "valid-name" });
      expect(res.status).toBe(404);
    });
    it("should return 400 error if given tods name has less tan 3 char", async () => {
      await Todo.collection.insertMany([
        {
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
        },
      ]);
      const res = await request(server)
        .patch("/api/todos/6561ccc4c7f982b3fadaa535")
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("should return 400 error if given tods name has more than 255 char", async () => {
      await Todo.collection.insertMany([
        {
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
        },
      ]);
      const res = await request(server)
        .patch("/api/todos/6561ccc4c7f982b3fadaa535")
        .send({
          name: "1234573698798;sdlkfjg;sldfkgj;lsdkfjg;lsdkfjg;lakjfg;alksdfjg;lakjsd;lfajs;dlfkj;alskdjf;laksdjf;lakjsd;lfkj;alskdfj;laskdjf;laksjdlfkja;lskdjf76987698273465987236948576928374569283746598273465982736459872364985726394875692873465982734695872346958723694857692837465982376459872364598723649587263948756928734569283746",
        });
      expect(res.status).toBe(400);
    });

    it("should change name prop of todo with given new name in the given req for update", async () => {
      await Todo.collection.insertMany([
        {
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
        },
      ]);
      const res = await request(server)
        .patch("/api/todos/6561ccc4c7f982b3fadaa535")
        .send({
          name: "new-name",
        });
      expect(res.body.name).toBe("new-name");
    });
    it("should change isDone prop of todo with given new isDone in the given req for update", async () => {
      await Todo.collection.insertMany([
        {
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
        },
      ]);
      const res = await request(server)
        .patch("/api/todos/6561ccc4c7f982b3fadaa535")
        .send({
          name: "new-name",
          isDone: true,
        });
      expect(res.body.isDone).toBe(true);
    });
  });
  describe("Delete /:id", () => {
    beforeEach(async () => {
      await Todo.collection.insertMany([
        {
          _id: new mongoose.mongo.ObjectId("6561ccc4c7f982b3fadaa535"),
          name: "todo1",
          isDone: false,
          createdAt: 1,
          deletedAt: null,
        },
      ]);
    });
    it("should return 404 error if given id is not valid id", async () => {
      const res = await request(server).delete("/api/todos/1");
      expect(res.status).toBe(404);
    });
    it("should return 204 error if given id is not associated with todod in database", async () => {
      const res = await request(server).delete(
        "/api/todos/6561ccc4c7f982b3fadaa536"
      );
      expect(res.status).toBe(204);
    });
    it("should define deleteAt prop for todo if given id is associated with a todod in database", async () => {
      const res = await request(server).delete(
        "/api/todos/6561ccc4c7f982b3fadaa535"
      );
      expect(res.status).toBe(204);
    });
    it("should return status code 204 after soft delete a todo", async () => {
      const res = await request(server).delete(
        "/api/todos/6561ccc4c7f982b3fadaa535"
      );
      expect(res.status).toBe(204);
    });
  });
});
