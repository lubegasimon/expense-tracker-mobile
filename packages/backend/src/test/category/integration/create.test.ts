import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import { closeRedisClient } from "../../../middleware/session";

describe("POST /category/create", () => {
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 201 when category is created", async () => {
    const response = await request(app)
      .post("/category/create")
      .send({
        name: "Utilities",
        description:
          "Payments for water, electricity, gas, garbage, sewage, et cetera",
      })
      .expect(201);
    expect(response.body.message).toBe("Utilities successfully created");
    expect(response.body.category).toHaveProperty("name", "Utilities");
    expect(response.body.category).toHaveProperty("id");
  });

  it("should return 409 for a category name that exists", async () => {
    const category = {
      name: "Utilities",
    };
    const response = await request(app)
      .post("/category/create")
      .send(category)
      .expect(409);
    expect(response.body.message).toBe("Utilities already exists");
  });
});
