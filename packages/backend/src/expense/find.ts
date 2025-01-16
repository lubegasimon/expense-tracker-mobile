import models from "../models";

export const findExpenseById = async (id: string) => {
  return await models.Expense.findByPk(id);
};
