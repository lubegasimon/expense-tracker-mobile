import request from "supertest";
import app from "../../app";
import create from "../../../user/create";
import { sequelize } from "../../../db/db";
import models from "../../../models";

describe("email edge cases", () => {
  it("should return 400 for invalid email format", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        username: "johndoe",
        email: "john.doe",
        password: "johndoe",
        confirmPassword: "johndoe",
      })
      .expect(400);

    expect(response.body.error.email).toContain("Invalid email format");
  });

  it("should return 400 for invalid email format", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        username: "johndoe",
        email: "",
        password: "johndoe",
        confirmPassword: "johndoe",
      })
      .expect(400);

    expect(response.body.error.email).toContain("Invalid email format");
  });

  afterEach(async () => await models.User.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return 409 for an email that exists", async () => {
    const user = {
      username: "johndoe",
      email: "john@example.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    };
    await create(user);
    const response = await request(app).post("/signup").send(user).expect(409);

    expect(response.body.error).toBe("Email already exists");
  });
});
