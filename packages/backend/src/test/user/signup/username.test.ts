import request from "supertest";
import app from "../app";

describe("username edge cases", () => {
  it("should return 200 for valid user data", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "john@example.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Valid user data");
  });

  it("should return 400 for invalid username, fewer than 5 characters", async () => {
    const response = await request(app).post("/signup").send({
      username: "john",
      email: "john@doe.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.status).toBe(400);
    console.log("Response", response.body.error);
    expect(response.body.error.username).toContain(
      "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
    );
  });

  it("should return 400 for invalid username, more than 10 characters", async () => {
    const response = await request(app).post("/signup").send({
      username: "john123456789",
      email: "john@doe.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.status).toBe(400);
    expect(response.body.error.username).toContain(
      "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
    );
  });

  it("should return 400 for invalid username, containing special characters except underscore", async () => {
    const response = await request(app).post("/signup").send({
      username: "john.",
      email: "john@doe.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.status).toBe(400);
    expect(response.body.error.username).toContain(
      "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
    );
  });

  it("should return 400 for invalid username, containing white space", async () => {
    const response = await request(app).post("/signup").send({
      username: "john doe",
      email: "john@doe.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.status).toBe(400);
    expect(response.body.error.username).toContain(
      "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
    );
  });
});
