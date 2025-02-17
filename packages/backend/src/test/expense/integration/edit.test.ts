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

    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Apple music",
        amount: 10,
        details: "February subscription",
        category: category.name,
        createdAt: "17/01/2025",
      })
      .expect(200);
    expect(response.body.message).toBe("Expense successfully updated");
    expect(response.body.expense).toHaveProperty("name", "Apple music");
    expect(response.body.expense).toHaveProperty(
      "details",
      "February subscription",
    );
    expect(response.body.expense).toHaveProperty("amount", "10.00");
    expect(response.body.expense).toHaveProperty("id", `${id}`);
    expect(response.body.expense).toHaveProperty("categoryId", category.id);
    expect(response.body.expense).toHaveProperty(
      "createdAt",
      "2025-01-17T00:00:00.000Z",
    );
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
    expect(response.body.expense).toHaveProperty("name", "Dog food");
    expect(response.body.expense).toHaveProperty("amount", "10.00");
    expect(response.body.expense).toHaveProperty("id", `${id}`);
    expect(response.body.expense).toHaveProperty(
      "createdAt",
      "2025-01-17T00:00:00.000Z",
    );
  });

  it("should return 400 when expense name is not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        amount: 20,
      })
      .expect(400);
    expect(response.body.error.name).toBe("name is required");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 400 when expense amount is not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Spotify",
      })
      .expect(400);
    expect(response.body.error.amount).toBe("amount is required");
    expect(response.body.expense).toBeUndefined();
  });

  it("should return 404 if a expense ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .put(`/expense/${invalidId}`)
      .send({ name: "Prime", amount: 10 })
      .expect(404);
    expect(response.body.error).toBe("Expense not found");
  });

  describe("Should return 400 if createdAt format is invalid", () => {
    it("should return 400 when createdAt is empty string", async () => {
      const response = await request(app)
        .put(`/expense/${id}`)
        .send({
          name: "Dog food",
          amount: 10,
          createdAt: "",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example 01/12/2025",
      );
      expect(response.body.expense).toBeUndefined();
    });
  });
});
