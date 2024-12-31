import request from "supertest";
import app from "../app";
import { redisStore } from "../../../middleware/session";

describe("POST /signup/resend-code", () => {
  afterEach(() =>
    redisStore.client.del([`verification:john@doe.com`]).catch(console.error),
  );
  it("should return 200 if code is sent to email", async () => {
    const response = await request(app)
      .post("/signup/resend-code")
      .send({
        email: "john@doe.com",
      })
      .expect(200);

    expect(response.body.message).toBe(
      "A new verification code has been sent to your email",
    );
  });
});
