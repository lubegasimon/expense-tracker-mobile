import { v4 as uuidv4 } from "uuid";
import createExpense from "../../../expense/operations/create";
import createCategory from "../../../category/operations/create";
import { sequelize } from "../../../../db/db";
import { findExpenseById } from "../../../expense/operations/find";
import models from "../../../models";

const id = uuidv4();

const expense = {
  id,
  name: "Personal loan",
  amount: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("find expense", () => {
  afterEach(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());

  it("should return expense if it exists", async () => {
    await createExpense(expense);
    const result = await findExpenseById(id);
    expect(result).toHaveProperty("name", "Personal loan");
    expect(result).toHaveProperty("Category", null);
  });

  it("should return expense if it exists", async () => {
    const category = {
      id: uuidv4(),
      name: "Recreational and Entertainment",
      description:
        "Costs for hobbies, leisure activities, gym memberships, streaming subscriptions et cetera",
    };

    const anotherExpense = {
      ...expense,
      categoryId: category.id,
    };

    await createCategory(category);
    await createExpense(anotherExpense);
    const result = await findExpenseById(anotherExpense.id);
    expect(result).toHaveProperty("name", "Personal loan");
    expect(result).toHaveProperty("categoryId", category.id);
    expect(result).toHaveProperty(
      "Category.dataValues.name",
      "Recreational and Entertainment",
    );
  });

  it("should return null if expense does not exist or is empty", async () => {
    await createExpense(expense);
    const invalidId = uuidv4();
    const result = await findExpenseById(invalidId);
    expect(result).toBeNull();
  });
});
