import request from "supertest";
import app from "../../app";

describe("Test GET /authorizations-transactions", () => {
  test("It should respond with 200 status code", async () => {
    await request(app)
      .get(`/authorizations-transactions?limit=${1}`)
      .expect(200);
  });
});
