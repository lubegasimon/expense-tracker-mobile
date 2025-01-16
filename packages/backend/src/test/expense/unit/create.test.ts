import { v4 as uuidv4 } from "uuid";
import create from "../../../expense/create";
import { sequelize } from "../../../db/db";
import models from "../../../models";

const expense = {
  id: uuidv4(),
  name: "Water bill",
  details: "For January",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Create expense", () => {
  afterAll(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("create expense", async () => {
    return await create(expense).then(async (expense) => {
      expect(expense).toHaveProperty("name", "Water bill");
      expect(expense).toHaveProperty("amount");
    });
  });
});
