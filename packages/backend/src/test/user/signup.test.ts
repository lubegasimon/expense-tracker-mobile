import request from "supertest";
import app from "./app";

describe("POST /signup", () => {
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
      expect(response.body.error[0].message).toContain(
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
      expect(response.body.error[0].message).toContain(
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
      expect(response.body.error[0].message).toContain(
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
      expect(response.body.error[0].message).toContain(
        "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
      );
    });
  });

  describe("email edge cases", () => {
    it("should return 400 for invalid email format", async () => {
      const response = await request(app).post("/signup").send({
        username: "johndoe",
        email: "john.doe",
        password: "johndoe",
        confirmPassword: "johndoe",
      });
      expect(response.status).toBe(400);
      expect(response.body.error[0].message).toContain(
        'must match format "email"',
      );
    });
  });

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
  });

  /* TODO: Could be improved, but blocked:
   see -- https://stackoverflow.com/questions/79159863/typescript-seems-to-not-fully-support-data-option-for-const-validation */
  describe("cross password edge case", () => {
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
});
