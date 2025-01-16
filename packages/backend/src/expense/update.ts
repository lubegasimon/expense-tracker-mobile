import models from "../models";
import { ExpenseAttrs } from "./model";

const updateExpense = async (expense: ExpenseAttrs) => {
  const { id, name, details, amount, categoryId } = expense;
  return await models.Expense.update(
    { name, details, amount, categoryId },
    { where: { id } },
  );
};

export default updateExpense;
