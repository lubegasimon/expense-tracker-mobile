import { v4 as uuidv4 } from "uuid";
import create from "../../../expense/operations/create";
import deleteExpense from "../../../expense/operations/delete";
import { sequelize } from "../../../../db/db";
import models from "../../../models";

const id = uuidv4();

const expense = {
  id,
  name: "Gym membership",
  details: "Gym membership for January",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("DELETE expense", () => {
  afterAll(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should delete expense", async () => {
    const createdExpense = await create(expense);
    expect(createdExpense).toHaveProperty("name", "Gym membership");
    expect(createdExpense).toHaveProperty("amount", 20);

    const result = await deleteExpense(id);
    expect(result).toEqual(1);
  });

  it("should return 0 if expense with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const result = await deleteExpense(invalidId);
    expect(result).toStrictEqual(0);
  });
});
