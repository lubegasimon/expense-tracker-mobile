import request from "supertest";
import app from "../../app";
import findUserByEmail from "../../../user/operations/find";
import { closeRedisClient } from "../../../middleware/session";

describe("password edge case", () => {
  afterAll(() => closeRedisClient());

  it("should return 400 if password contains fewer than 5 characters", async () => {
    const email = "johnn@doe.com";
    await findUserByEmail(email);

    const response = await request(app)
      .post("/signup")
      .send({
        username: "johndoe",
        email,
        password: "john",
        confirmPassword: "john",
      })
      .expect(400);

    expect(response.body.error.password).toBe(
      "Password must NOT have fewer than 5 characters",
    );
  });

  /* TODO: Could be improved, but blocked:
   see -- https://stackoverflow.com/questions/79159863/typescript-seems-to-not-fully-support-data-option-for-const-validation */
  it("should return 400 if passwords do not match", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        username: "johndoe",
        email: "johnn@doe.com",
        password: "johndoe",
        confirmPassword: "johndo",
      })
      .expect(400);

    expect(response.body.error.confirmPassword).toBe("Passwords do not match");
  });
});
