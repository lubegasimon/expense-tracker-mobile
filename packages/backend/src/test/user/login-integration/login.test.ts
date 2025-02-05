import request from "supertest";
import app from "../../app";
import create from "../../../user/operations/create";
import { sequelize } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import { closeRedisClient } from "../../../middleware/session";

const user = {
  id: uuidv4(),
  username: "johndoe",
  email: "john@doe.com",
  password: "johndoe",
};

describe("POST /login", () => {
  afterAll(() => models.User.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => {
    closeRedisClient();
  });

  it("should return 200 if email and password are correct", async () => {
    await create(user);
    const response = await request(app).post("/login").send({
      email: "john@doe.com",
      password: "johndoe",
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Successfully signed in");
  });

  it("should return 409 if password is invalid", async () => {
    const response = await request(app).post("/login").send({
      email: "john@doe.com",
      password: "johndoe123",
    });
    expect(response.status).toBe(409);
    expect(response.body.error).toBe("Invalid email or password");
  });

  it("should return 409 if email is unknown", async () => {
    const response = await request(app).post("/login").send({
      email: "john@doe123.com",
      password: "johndoe",
    });
    expect(response.status).toBe(409);
    expect(response.body.error).toContain("No account found with this email");
  });
});
