const request = require("supertest");
let server;

describe("/api/todos", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all available todos", async () => {
      const res = await request(server).get("/api/todos?page=1&prPage=10");
      expect(res.status).toBe(200);
    });
  });
});
