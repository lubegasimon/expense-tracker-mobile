import models from "../models";

const deleteExpense = async (id: string) => {
  return await models.Expense.destroy({ where: { id } });
};

export default deleteExpense;
