import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import create from "../../../expense/operations/create";
import createCategory from "../../../category/operations/create";
import editExpense from "../../../expense/operations/update";
import { findExpenseById } from "../../../expense/operations/find";

const id = uuidv4();

const expense = {
  id,
  name: "Birthday gift",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Update expense", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());

  it("should update expense details", async () => {
    await create(expense);
    const [result] = await editExpense({
      ...expense,
      details: "Doe's 26th birthday gift",
    });
    const editedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(editedExpense).toHaveProperty("details", "Doe's 26th birthday gift");
  });

  it("should update expense name, amount, and details ", async () => {
    const [result] = await editExpense({
      id,
      name: "Wedding pledge",
      amount: 30,
      details: "Pledge fullfulment for Doe's wedding",
    });
    const editedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(editedExpense).toHaveProperty("name", "Wedding pledge");
    expect(editedExpense).toHaveProperty(
      "details",
      "Pledge fullfulment for Doe's wedding",
    );
    expect(editedExpense).toHaveProperty("amount", 30);
  });

  it("should change expense category", async () => {
    const categoryId = uuidv4();
    const category = await createCategory({
      id: categoryId,
      name: "Miscellaneous",
      description:
        "Any unclassified expenses, such as gifts, donations, personal indulgences",
    });
    const [result] = await editExpense({
      ...expense,
      categoryId: category.id,
    });
    const editedExpense = await findExpenseById(id);
    expect(result).toEqual(1);
    expect(editedExpense).toHaveProperty("categoryId", categoryId);
  });

  it("should return 0 if expense with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const [result] = await editExpense({
      ...expense,
      id: invalidId,
    });
    expect(result).toEqual(0);
  });
});
