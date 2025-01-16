import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../expense/create";
import createCategory from "../../../category/create";
import updateExpense from "../../../expense/update";
import { findExpenseById } from "../../../expense/find";

const id = uuidv4();

const expense = {
  id,
  name: "Water bill",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Update expense", () => {
  afterAll(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());

  it("should update expense details", async () => {
    await create(expense);
    const [result] = await updateExpense({
      ...expense,
      details: "For January",
    });
    const updatedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(updatedExpense).toHaveProperty("details", "For January");
  });

  it("should update expense name, amount, and details ", async () => {
    const [result] = await updateExpense({
      id,
      name: "Electricity",
      amount: 30,
      details: "For February",
    });
    const updatedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(updatedExpense).toHaveProperty("name", "Electricity");
    expect(updatedExpense).toHaveProperty("details", "For February");
  });

  it("should change expense category", async () => {
    const categoryId = uuidv4();
    const category = await createCategory({
      id: categoryId,
      name: "Internet",
      details: "Internet for January",
    });
    const [result] = await updateExpense({
      ...expense,
      categoryId: category.id,
    });
    const updatedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(updatedExpense).toHaveProperty("categoryId", categoryId);
  });

  it("should return 0 if expense with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const [result] = await updateExpense({
      ...expense,
      id: invalidId,
    });
    expect(result).toEqual(0);
  });
});
