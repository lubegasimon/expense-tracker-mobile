import { v4 as uuidv4 } from "uuid";
import create from "../../../expense/operations/create";
import { sequelize } from "../../../../db/db";
import models from "../../../models";

const expense = {
  id: uuidv4(),
  name: "Water bill",
  details: "Water bill for January",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Create expense", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("create expense", () =>
    create(expense).then((expense) => {
      expect(expense).toHaveProperty("name", "Water bill");
      expect(expense).toHaveProperty("amount", 20);
    }));
});
