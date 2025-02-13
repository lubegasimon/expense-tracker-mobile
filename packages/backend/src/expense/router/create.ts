import { Request, Response, Router } from "express";
import create from "../operations/create";
import { findCategory } from "../../category/operations/find";
import { formatClientDate } from "../formatDate";
import validateCreateExpenseRequest from "../../middleware/validation/expense/validate";

const router = Router();

router.post(
  "/",
  validateCreateExpenseRequest(),
  async (request: Request, response: Response) => {
    const { name, amount, details, createdAt, category } = request.body;

    const categoryData =
      category === undefined ? null : await findCategory(category);

    create({
      name,
      amount,
      details,
      createdAt: formatClientDate(createdAt),
      categoryId: categoryData?.id,
    })
      .then(() =>
        response.status(201).json({
          message: `Expense successfully created`,
        }),
      )
      .catch((error) => {
        console.error(`An error occurred while creating expense: ${error}`);
        response.status(500).send({
          message: "An error occurred while creating expense. Please try again",
        });
      });
  },
);

export default router;
