const request = require("supertest");
const Todo = require("../models/todo");
const { describe } = require("joi/lib/types/lazy");
let server;

describe("/api/todos", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return status code 200 for vlaid get request", async () => {
      const res = await request(server).get("/api/todos?page=1&prPage=10");
      expect(res.status).toBe(200);
    });
    it("should find todos with given filter", () => {});
    it("should sort finded todos with given parameters", () => {});
    it("should skip some of finded todos with given parameters", () => {});
    it("should limit finded todos with given parameters", () => {});
    it("should return status code 500 for ivlaid get request", async () => {
      const res = await request(server).get("/api/todos");
      expect(res.status).toBe(500);
    });
  });
  describe("Get /:id", () => {
    it("should return 404 error if given id is not associated with todod in database", () => {});
    it("should retunr todo if given id is a valid id of a todo in database", () => {});
  });
  describe("Post /", () => {
    it("should return 400 error if given todo is not valid", () => {});
    it("should save todo to the database if given todo is valid to save", () => {});
    it("should return the todo that just saved to the database", () => {});
  });
  describe("Patch /:id", () => {
    it("should return 404 error if given id is not associated with todod in database", () => {});
    it("should return 400 error if given todo is not valid", () => {});
    it("should change name prop of todo with given new name in the given req for update", () => {});
    it("should change isDone prop of todo with given new isDone in the given req for update", () => {});
    it("should return the todo that just update and saved to the database", () => {});
  });
  describe("Delete /:id", () => {
    it("should return 204 error if given id is not associated with todod in database", () => {});
    it("should define deleteAt prop for todo if given id is associated with a todod in database", () => {});
    it("should save todo to the database with new deltedAt prop", () => {});
    it("should return status code 204 after soft delete a todo", () => {});
  });
});
