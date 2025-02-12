import { Router, Request, Response } from "express";
import editExpense from "../operations/update";
import { findCategory } from "../../category/operations/find";
import { formatClientDate } from "../formatDate";

const router = Router();

router.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const { name, amount, details, category, createdAt } = request.body;

  const categoryData =
    category === undefined ? null : await findCategory(category);

  const expense = {
    id,
    name,
    amount,
    details,
    categoryId: categoryData?.id,
    createdAt: formatClientDate(createdAt),
  };

  if (!name) response.status(400).json({ message: "Name is required" });
  else if (!amount)
    response.status(400).json({ message: "Amount is required" });
  else
    editExpense(expense)
      .then(([result]) => {
        if (result !== 1)
          return response.status(404).json({
            message: "Expense not found",
          });
        return response.status(200).json({
          message: "Expense successfully updated",
        });
      })
      .catch((error) => {
        console.error(`An error occurred while updating expense: ${error}`);
        return response.status(500).send({
          message: "An error occurred while updating expense. Please try again",
        });
      });
});

export default router;
