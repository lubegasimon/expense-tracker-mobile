import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../expense/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();

const expense = {
  name: "Fruits",
  amount: 10,
  id,
};

describe("GET /expense", () => {
  afterAll(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("should return 200 and fetch categories", async () => {
    await create(expense);
    const response = await request(app).get("/expense").expect(200);
    expect(response.body.message).toStrictEqual([
      { ...expense, details: null, categoryId: null },
    ]);
  });
});