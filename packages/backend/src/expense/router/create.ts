import { Request, Response, Router } from "express";
import create from "../operations/create";
import { findCategory } from "../../category/operations/find";
import validateExpenseRequestBody from "../../middleware/validation/expense/validate";

const router = Router();

router.post(
  "/",
  validateExpenseRequestBody(),
  async (request: Request, response: Response) => {
    const { name, amount, details, createdAt, category } = request.body;
    const categoryData = !category ? null : await findCategory(category);
    create({
      name,
      amount,
      details,
      createdAt: createdAt === undefined ? new Date() : createdAt,
      categoryId: categoryData?.id,
    })
      .then((expense) =>
        response.status(201).json({
          message: `Expense successfully created`,
          expense,
        }),
      )
      .catch((error) => {
        console.error(`An error occurred while creating expense: ${error}`);
        response.status(500).json({
          error: "An error occurred while creating expense. Please try again",
        });
      });
  },
);

export default router;
