import { Router, Request, Response } from "express";
import { parse } from "date-fns";
import updateExpense from "../../expense/update";

const router = Router();

router.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const { name, amount, details, categoryId, createdAt } = request.body;
  const parsedDate = createdAt
    ? parse(createdAt, "dd/MM/yyyy", new Date())
    : undefined;

  const expense = {
    id,
    name,
    amount,
    details,
    categoryId,
    createdAt: parsedDate,
  };

  if (!name) response.status(400).json({ message: "Name is required" });
  else if (!amount)
    response.status(400).json({ message: "Amount is required" });
  else
    await updateExpense(expense)
      .then(([result]) => {
        if (result !== 1)
          return response.status(404).json({
            message: "Expense not found",
          });
        return response.status(200).json({
          message: "Expense successfully updated",
          expense,
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
