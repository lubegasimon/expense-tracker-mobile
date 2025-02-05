import models from "../../models";
import { ExpenseAttrs } from "../model";

const updateExpense = (expense: ExpenseAttrs) => {
  const { id, name, details, amount, categoryId } = expense;
  return models.Expense.update(
    { name, details, amount, categoryId },
    { where: { id } },
  );
};

export default updateExpense;
