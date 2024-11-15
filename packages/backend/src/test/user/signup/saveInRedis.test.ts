import request from "supertest";
import app from "../app";
import { redisClient } from "../../../middleware/session";
import { redisError } from "../../../router/user/error";

describe("Check if candidate data is saved in Redis storage", () => {
  afterAll(() => redisClient.disconnect().catch((error) => redisError(error)));
  afterEach(() =>
    redisClient.del("signup*").catch((error) => redisError(error)),
  );

  it("should return saved candidate's data ", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "johnn@doe.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.body.savedCandidateData).toBe(
      '{"username":"johndoe","email":"johnn@doe.com","password":"johndoe"}',
    );
  });
});
