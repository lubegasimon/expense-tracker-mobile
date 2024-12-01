import request from "supertest";
import app from "../app";

describe("password edge case", () => {
  it("should return 400 if password contains fewer than 5 characters", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "johnn@doe.com",
      password: "john",
      confirmPassword: "john",
    });
    expect(response.status).toBe(400);
    expect(response.body.error[0].message).toBe(
      "Password must NOT have fewer than 5 characters",
    );
  });

  /* TODO: Could be improved, but blocked:
   see -- https://stackoverflow.com/questions/79159863/typescript-seems-to-not-fully-support-data-option-for-const-validation */
  it("should return 400 if passwords do not match", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "johnn@doe.com",
      password: "johndoe",
      confirmPassword: "johndo",
    });
    expect(response.status).toBe(400);
    expect(response.body.error[0].message).toBe("Passwords do not match");
  });
});
