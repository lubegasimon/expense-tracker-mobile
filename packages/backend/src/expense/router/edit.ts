import { Router, Request, Response } from "express";
import editExpense from "../operations/edit";
import { findCategory } from "../../category/operations/find";
import { formatClientDate } from "../formatDate";
import validateExpenseRequestBody from "../../middleware/validation/expense/validate";

const router = Router();

router.put(
  "/:id",
  validateExpenseRequestBody(),
  async (request: Request, response: Response) => {
    const id = request.params.id;
    const { name, amount, details, category, createdAt } = request.body;
    const categoryData = !category ? null : await findCategory(category);

    // TODO: Efficiency, don't overwrite the table attributes that have not changed?
    const expense = {
      id,
      name,
      amount,
      details,
      categoryId: categoryData?.id,
      createdAt: formatClientDate(createdAt),
    };

    editExpense({ ...expense })
      .then(([result, row]) => {
        if (result !== 1)
          return response.status(404).json({
            error: "Expense not found",
          });
        return response.status(200).json({
          message: "Expense successfully updated",
          expense: row[0],
        });
      })
      .catch((error) => {
        console.error(`An error occurred while updating expense: ${error}`);
        return response.status(500).send({
          error: "An error occurred while updating expense. Please try again",
        });
      });
  },
);

export default router;
