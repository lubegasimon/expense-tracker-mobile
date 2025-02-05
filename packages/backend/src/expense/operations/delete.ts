import models from "../../models";

const deleteExpense = (id: string) => models.Expense.destroy({ where: { id } });

export default deleteExpense;
