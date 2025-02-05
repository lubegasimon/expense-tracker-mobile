import { ExpenseAttrs, ExpenseInstance } from "../model";
import models from "../../models";

const create = (expense: ExpenseAttrs) => models.Expense.create(expense);

export default create;
