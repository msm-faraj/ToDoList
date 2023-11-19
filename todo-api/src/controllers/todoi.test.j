const request = require("supertest");
const Todo = require("../models/todo");
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
    it("should return status code 500 for ivlaid get request", async () => {
      const res = await request(server).get("/api/todos");
      expect(res.status).toBe(500);
    });
  });
});
