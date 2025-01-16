import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import { closeRedisClient } from "../../../middleware/session";

describe("POST /category/create", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("should return 200 when category is created", async () => {
    const response = await request(app)
      .post("/category/create")
      .send({
        name: "Water",
        description: "Water bill",
      })
      .expect(201);
    expect(response.body.message).toBe("Category Water successfully created");
    expect(response.body.category).toHaveProperty("name", "Water");
    expect(response.body.category).toHaveProperty("description", "Water bill");
    expect(response.body.category).toHaveProperty("id");
  });

  it("should return 409 for a category name that exists", async () => {
    const category = {
      name: "Water",
      description: "Water bills",
    };
    const response = await request(app)
      .post("/category/create")
      .send(category)
      .expect(409);
    expect(response.body.message).toBe("Category already exists");
  });
});
