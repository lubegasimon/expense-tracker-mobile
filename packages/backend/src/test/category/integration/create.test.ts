import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";

describe("POST /category/create", () => {
  afterAll(async () => await models.Category.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return 200 when category is created", async () => {
    const response = await request(app)
      .post("/category/create")
      .send({
        name: "Water",
        details: "Water bill",
      })
      .expect(201);
    expect(response.body.message).toBe("Category Water successfully created");
    expect(response.body.category).toHaveProperty("name", "Water");
    expect(response.body.category).toHaveProperty("details", "Water bill");
    expect(response.body.category).toHaveProperty("id");
  });

  it("should return 409 for a category name that exists", async () => {
    const category = {
      name: "Water",
      details: "Water bills",
    };
    const response = await request(app)
      .post("/category/create")
      .send(category)
      .expect(409);
    expect(response.body.message).toBe("Category already exists");
  });
});
