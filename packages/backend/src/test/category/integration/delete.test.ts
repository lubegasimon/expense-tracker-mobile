import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../category/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const category = {
  id,
  name: "Housing",
  description: "Payment for rent, mortgage, property taxes, et cetera",
};

describe("DELETE /category/:id", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("should return 200 when category is successfully deleted", async () => {
    await create(category);
    const response = await request(app).delete(`/category/${id}`).expect(200);
    expect(response.body.message).toBe(`${category.name} successfully deleted`);
  });

  it("should return 404 if a category ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .delete(`/category/${invalidId}`)
      .expect(404);
    expect(response.body.message).toBe("Category not found");
  });
});
