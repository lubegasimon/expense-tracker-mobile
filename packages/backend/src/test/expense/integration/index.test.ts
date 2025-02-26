import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import create from "../../../expense/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();

const expense = {
  id,
  name: "Fruits",
  amount: 10,
};

describe("GET /expense", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 and fetch categories", async () => {
    await create(expense);
    const response = await request(app).get("/expense").expect(200);
    console.log ("Response body ->", response.body);
    expect(response.body.expenses).toStrictEqual([
      { ...expense, amount: "10.00", details: null, categoryId: null },
    ]);
  });
});
