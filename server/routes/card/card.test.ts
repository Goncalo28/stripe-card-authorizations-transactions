import request from "supertest";
import app from "../../app";

describe("Test GET /card", () => {
  test("It should respond with 200 status code", async () => {
    await request(app).get("/card").expect(200);
  });
});
