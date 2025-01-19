import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { parse } from "date-fns";
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
};

describe("PUT /expense/:id", () => {
  afterAll(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("should return 200 when expense update is successful", async () => {
    await createExpense(expense);
    const category = await createCategory({
      id,
      name: "Recreational and Entertainment",
      description:
        "Costs for hobbies, leisure activities, gym memberships, streaming subscriptions et cetera",
    });

    const date = "17/01/2025";
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());

    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Apple music",
        amount: 10,
        details: "February subscription",
        categoryId: category.id,
        createdAt: date,
      })
      .expect(200);
    expect(response.body.message).toBe("Expense successfully updated");
    expect(response.body.expense).toHaveProperty("name", "Apple music");
    expect(response.body.expense).toHaveProperty(
      "details",
      "February subscription",
    );
    expect(response.body.expense).toHaveProperty("amount", 10);
    expect(response.body.expense).toHaveProperty("id", `${id}`);
    expect(response.body.expense).toHaveProperty(
      "createdAt",
      parsedDate.toISOString(),
    );
  });

  it("should return 200 when expense details and categoryId are not provided", async () => {
    const response = await request(app)
      .put(`/expense/${id}`)
      .send({
        name: "Dog food",
        amount: 10,
      })
      .expect(200);
    expect(response.body.message).toBe("Expense successfully updated");
    expect(response.body.expense).toHaveProperty("name", "Dog food");
    expect(response.body.expense).toHaveProperty("amount", 10);
    expect(response.body.expense).toHaveProperty("id", `${id}`);
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
