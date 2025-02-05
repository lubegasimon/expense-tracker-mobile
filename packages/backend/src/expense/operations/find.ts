import models from "../../models";

export const findExpenseById = (id: string) => models.Expense.findByPk(id);
