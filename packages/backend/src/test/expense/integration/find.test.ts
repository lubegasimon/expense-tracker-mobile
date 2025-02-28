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

  it("should return 200 when expense is found", async () => {
    await createExpense(expense);

    const response = await request(app).get(`/expense/${id}`).expect(200);
    expect(response.body.expense).toHaveProperty("name", "Netflix");
    expect(response.body.expense).toHaveProperty(
      "details",
      "January subscription",
    );
  });

  it("should return 404 if a expense is not found", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .get(`/expense/${invalidId}`)
      .expect(404);
    expect(response.body.error).toBe("Expense not found");
    expect(response.body.expense).toBeUndefined();
  });
});

describe("GET /expenses?date=DATE", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 and expenses created on a specified date", async () => {
    await createExpense(expense);

    const response = await request(app)
      .get(`/expenses?date=2025-01-05T21:00:00.000Z`)
      .expect(200);
    expect(
      response.body.expenses.map((expense: any) => {
        const { updatedAt, ...rest } = expense;
        return rest;
      }),
    ).toStrictEqual([
      {
        ...expense,
        amount: "10.00",
        categoryId: null,
        Category: null,
        createdAt: "2025-01-05T21:00:00.000Z",
      },
    ]);
  });

  it("should return 200 and expenses created on a specified date", async () => {
    const id = uuidv4();
    const anotherExpense = {
      id,
      name: "Internet",
      amount: 30,
      details: "March subscription",
      createdAt: new Date("2025-01-05T00:00:00.000Z"),
    };
    await createExpense(anotherExpense);

    const response = await request(app)
      .get(`/expenses?date=2025-01-05`)
      .expect(200);
    expect(
      response.body.expenses.map((expense: any) => {
        const { updatedAt, ...rest } = expense;
        return rest;
      }),
    ).toStrictEqual([
      {
        ...anotherExpense,
        amount: "30.00",
        categoryId: null,
        Category: null,
        createdAt: "2025-01-05T00:00:00.000Z",
      },
      {
        ...expense,
        amount: "10.00",
        categoryId: null,
        Category: null,
        createdAt: "2025-01-05T21:00:00.000Z",
      },
    ]);
  });

  it("should return 200 and expenses created on a current date when date is not specified", async () => {
    const id = uuidv4();
    await createExpense({
      id,
      name: "Groceries",
      amount: 50,
      details: "Food and Fruits",
      createdAt: new Date(),
    });

    const response = await request(app).get(`/expenses?date=`).expect(200);
    expect(
      response.body.expenses.map((expense: any) => {
        const { updatedAt, createdAt, ...rest } = expense;
        return rest;
      }),
    ).toStrictEqual([
      {
        id,
        name: "Groceries",
        amount: "50.00",
        details: "Food and Fruits",
        categoryId: null,
        Category: null,
      },
    ]);
  });

  it("should return 404 and empty array if there are no expenses for the specified date", async () => {
    const response = await request(app)
      .get(`/expenses?date=2026-01-10`)
      .expect(404);
    expect(response.body.error).toBe("Expenses not found");
  });
});
