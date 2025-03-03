import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import create from "../../../category/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const category = {
  id,
  name: "Housing",
  description: "Payment for rent, mortgage, property taxes, et cetera",
};

describe("PUT /category/:id", () => {
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 when category update is successful", async () => {
    await create(category);
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        name: "Internet and Communication",
        description:
          "Payment for internet services, mobile phone plans, et cetera",
      })
      .expect(200);
    expect(response.body.message).toBe("Category successfully updated");
    expect(response.body.category).toHaveProperty(
      "name",
      "Internet and Communication",
    );
    expect(response.body.category).toHaveProperty(
      "description",
      "Payment for internet services, mobile phone plans, et cetera",
    );
    expect(response.body.category).toHaveProperty("id", `${id}`);
  });

  it("should return 200 when category description is not provided", async () => {
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        name: "Electricity",
      })
      .expect(200);
    expect(response.body.message).toBe("Category successfully updated");
    expect(response.body.category).toHaveProperty("name", "Electricity");
    expect(response.body.category).toHaveProperty("id", `${id}`);
  });

  it("should return 400 when category name is not provided", async () => {
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        description: "Others bills",
      })
      .expect(400);
    expect(response.body.error).toBe("Name is required");
  });

  it("should return 404 if a category ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .put(`/category/${invalidId}`)
      .send({ name: "Housing" })
      .expect(404);
    expect(response.body.error).toBe("Category not found");
  });
});
