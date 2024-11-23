import request from "supertest";
import app from "../app";

describe("Request to verifyCode endpoint", () => {
  it("should post to verifyCode endpoint", async () => {
    const response = await request(app).post("/signup/verify-code").send({
      code: 1234,
    });
    console.log("Status code", response.statusCode);
    console.log("Error message", response.error);
    console.log("Response body", response.body);
    expect(response.body.message).toBe("Valid code");
  });
});
