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

describe("Check if candidate data and verification code are saved in Redis", () => {
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

  it("should return saved verification code, associated to candidate's email", async () => {
    const response = await request(app).post("/signup").send(data);
    expect(response.body.savedVerificationCode).toBe("johnn@doe.com");
  });

  // TODO: Use stubs because an email is sent whenever this test runs.
  it("should send email to candidate's email", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "lubegasimon73@gmail.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.body.sendEmailStatus).toBe("Email sent");
  });
});
