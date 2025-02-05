import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import createCategory from "../../../category/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const category = {
  id,
  name: "Housing",
  description: "Payment for rent, mortgage, property taxes, et cetera",
};

describe("GET /category/:id", () => {
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => {
    closeRedisClient();
  });

  it("should return 200 when category is found", async () => {
    await createCategory(category);

    const response = await request(app).get(`/category/${id}`).expect(200);
    expect(response.body.category).toHaveProperty("name", "Housing");
    expect(response.body.category).toHaveProperty(
      "description",
      "Payment for rent, mortgage, property taxes, et cetera",
    );
    expect(response.body.category).toHaveProperty("id", `${id}`);
    expect(response.body.category).toHaveProperty("createdAt");
  });

  it("should return 404 if a category is not found", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .get(`/category/${invalidId}`)
      .expect(404);
    expect(response.body.message).toBe("Category not found");
  });
});
