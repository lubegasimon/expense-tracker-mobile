import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import createCategory from "../../../category/operations/create";
import { closeRedisClient } from "../../../middleware/session";

describe("POST /expense/create", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => {
    closeRedisClient();
  });

  it("should return 201 when expense is created", async () => {
    const category = await createCategory({ name: "Utility" });
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20,
        categoryId: category.id,
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toHaveProperty("name", "Water bill");
    expect(response.body.expense).toHaveProperty("amount", 20);
    expect(response.body.expense).toHaveProperty("id");
    expect(response.body.expense).toHaveProperty("category", category.name);
  });
});
