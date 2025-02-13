import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import createExpense from "../../../expense/operations/create";
import createCategory from "../../../category/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const expense = {
  id,
  name: "Netflix",
  amount: 10,
  details: "January subscription",
  createdAt: new Date("2025-01-05T21:00:00.000Z"),
};

describe("PUT /expense/:id", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 when expense update is successful", async () => {
    await createExpense(expense);
    const category = await createCategory({
      id,
      name: "Recreational and Entertainment",
      description:
        "Costs for hobbies, leisure activities, gym memberships, streaming subscriptions et cetera",
    });

    const DATE = "17/01/2025";

    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Apple music",
        amount: 10,
        details: "February subscription",
        category: category.name,
        createdAt: DATE,
      })
      .expect(200);
    expect(response.body.message).toBe("Expense successfully updated");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 200 when expense details and category are not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Dog food",
        amount: 10,
      })
      .expect(200);
    expect(response.body.message).toBe("Expense successfully updated");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 400 when expense name is not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        amount: 20,
      })
      .expect(400);
    expect(response.body.message).toBe("Name is required");
  });

  it("should return 400 when expense amount is not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Spotify",
      })
      .expect(400);
    expect(response.body.message).toBe("Amount is required");
  });

  it("should return 404 if a expense ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .put(`/expense/${invalidId}`)
      .send({ name: "Prime", amount: 10 })
      .expect(404);
    expect(response.body.message).toBe("Expense not found");
  });
});
