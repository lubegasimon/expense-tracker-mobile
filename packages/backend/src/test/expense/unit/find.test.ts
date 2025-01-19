import { v4 as uuidv4 } from "uuid";
import create from "../../../expense/operations/create";
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
  afterEach(async () => await models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return expense if it exists", async () => {
    await create(expense);
    const result = await findExpenseById(id);
    expect(result).toHaveProperty("name", "Personal loan");
  });

  it("should return null if expense does not exist or is empty", async () => {
    await create(expense);
    const invalidId = uuidv4();
    const result = await findExpenseById(invalidId);
    expect(result).toBeNull();
  });
});
