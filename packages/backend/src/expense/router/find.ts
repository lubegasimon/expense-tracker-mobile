import { Router, Request, Response } from "express";
import { findExpenseByDate, findExpenseById } from "../operations/find";
import { formatServerDate } from "../formatDate";

export const expenseByIdRouter = Router();
export const expensesByDateRouter = Router();

expenseByIdRouter.get("/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  findExpenseById(id)
    .then((expense) => {
      if (!expense)
        return response.status(404).json({ error: "Expense not found" });
      else
        return response.status(200).json({
          expense: {
            ...expense.dataValues,
            createdAt: formatServerDate(expense.createdAt),
          },
        });
    })
    .catch((error) => {
      console.error(`Error occurred while fetching expense by Id: ${error}`);
      return response.status(500).json({
        error: "An error occurred while fetching expense. Please try again",
      });
    });
});

expensesByDateRouter.get("/", (request: Request, response: Response) => {
  const { date } = request.query;
  const formattedDate = date ? new Date(date as string) : new Date();

  findExpenseByDate(formattedDate)
    .then((expenses) => {
      if (!expenses || expenses.length === 0) {
        return response.status(404).json({ error: "Expenses not found" });
      } else return response.status(200).json({ expenses });
    })
    .catch((error) => {
      console.error(`Error occurred while fetching expenses by Date: ${error}`);
      return response.status(500).json({
        error: "An error occurred while fetching expenses. Please try again",
      });
    });
});
