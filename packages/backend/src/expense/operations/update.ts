import models from "../../models";
import { ExpenseAttrs } from "../model";

const editExpense = (expense: ExpenseAttrs) => {
  const { id, name, details, amount, categoryId, createdAt } = expense;
  return models.Expense.update(
    { name, details, amount, categoryId, createdAt },
    { where: { id }, returning: true },
  );
};

export default editExpense;
