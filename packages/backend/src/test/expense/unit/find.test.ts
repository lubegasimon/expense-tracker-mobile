import { v4 as uuidv4 } from "uuid";
import createExpense from "../../../expense/operations/create";
import createCategory from "../../../category/operations/create";
import { sequelize } from "../../../../db/db";
import {
  findExpenseByDate,
  findExpenseById,
} from "../../../expense/operations/find";
import models from "../../../models";

const id = uuidv4();

const expense = {
  id,
  name: "Personal loan",
  amount: 20,
  createdAt: new Date(),
};

describe("find expense by Id", () => {
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

describe("find expense by Date", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  const anotherExpense = {
    id: uuidv4(),
    name: "Internet",
    amount: 20,
    createdAt: new Date("2025-02-06T00:00:00.000Z"),
  };

  it("should return expenses created on specified date", async () => {
    await createExpense(expense);
    await createExpense(anotherExpense);
    const result = await findExpenseByDate(new Date("2025-02-06"));
    expect(
      result.map((expense) => {
        const { updatedAt, ...rest } = expense.dataValues;
        return rest;
      }),
    ).toStrictEqual([
      {
        ...anotherExpense,
        amount: "20.00",
        details: null,
        categoryId: null,
        Category: null,
      },
    ]);
  });

  it("should return expenses for current date if date is not specified", async () => {
    const result = await findExpenseByDate(undefined);
    expect(
      result.map((expense) => {
        const { updatedAt, ...rest } = expense.dataValues;
        return rest;
      }),
    ).toStrictEqual([
      {
        ...expense,
        amount: "20.00",
        details: null,
        categoryId: null,
        Category: null,
      },
    ]);
  });

  it("should return empty array if there are no expenses for the specified date", async () => {
    const result = await findExpenseByDate(new Date("2024-01-02"));
    expect(result).toStrictEqual([]);
  });
});
