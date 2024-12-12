import request from "supertest";
import app from "../app";

describe("POST /signup/resend-code", () => {
  const EMAIL = "john@doe.com";

  it("should return 200 if code is sent to email", async () => {
    const response = await request(app).post("/signup/resend-code").send({
      email: EMAIL,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "A new verification code has been sent to your email",
    );
  });
});
