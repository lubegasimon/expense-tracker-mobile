import request from "supertest";
import app from "../app";
import { redisClient } from "../../../middleware/session";
import { redisError } from "../../../router/user/error";

const data = {
  username: "johndoe",
  email: "johnn@doe.com",
  password: "johndoe",
  confirmPassword: "johndoe",
};

describe("Check if candidate data and token are saved in Redis", () => {
  afterAll(() => redisClient.disconnect().catch((error) => redisError(error)));
  afterEach(() =>
    redisClient.del("signup*").catch((error) => redisError(error)),
  );

  it("should return saved candidate's data ", async () => {
    const response = await request(app).post("/signup").send(data);
    expect(response.body.savedCandidateData).toBe(
      '{"username":"johndoe","email":"johnn@doe.com","password":"johndoe"}',
    );
  });

  it("should return saved token, associated to candidate's email", async () => {
    const response = await request(app).post("/signup").send(data);
    expect(response.body.savedToken).toBe("johnn@doe.com");
  });
});
