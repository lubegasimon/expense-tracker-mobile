import { ExpenseAttrs, ExpenseInstance } from "./model";
import models from "../models";

const create = async (expense: ExpenseAttrs): Promise<ExpenseInstance> => {
  return await models.Expense.create(expense);
};

export default create;
