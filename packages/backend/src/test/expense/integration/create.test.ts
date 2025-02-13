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
  afterAll(() => closeRedisClient());

  it("should return 201 when expense is created", async () => {
    const category = await createCategory({ name: "Utility" });
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20,
        category: category.name,
        createdAt: "06/02/2025",
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 201 when details, category, and createdAt are not provided", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20,
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 400 when expense name and amount are missing", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({})
      .expect(400);
    expect(response.body.error.name).toBe("name is required");
    expect(response.body.error.amount).toBe("amount is required");
    expect(response.body.expense).toBeUndefined();
  });
});
