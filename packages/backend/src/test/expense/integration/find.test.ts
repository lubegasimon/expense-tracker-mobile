import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import createExpense from "../../../expense/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const expense = {
  id,
  name: "Netflix",
  amount: 10,
  details: "January subscription",
  createdAt: new Date("2025-01-05T21:00:00.000Z"),
};

describe("GET /expense/:id", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 when expense is found", async () => {
    await createExpense(expense);

    const response = await request(app).get(`/expense/${id}`).expect(200);
    expect(response.body.expense).toHaveProperty("name", "Netflix");
    expect(response.body.expense).toHaveProperty(
      "details",
      "January subscription",
    );
    expect(response.body.expense).toHaveProperty("amount", 10);
    expect(response.body.expense).toHaveProperty("id", `${id}`);
    expect(response.body.expense).toHaveProperty("createdAt", "05/01/2025");
  });

  it("should return 404 if a expense is not found", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .get(`/expense/${invalidId}`)
      .expect(404);
    expect(response.body.message).toBe("Expense not found");
  });
});
