import { Router, Request, Response } from "express";
import { findExpenseById } from "../operations/find";
import { formatServerDate } from "../formatDate";

const router = Router();

router.get("/:id", (request: Request, response: Response) => {
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
        error: "An error occurred while updating expense. Please try again",
      });
    });
});

export default router;
