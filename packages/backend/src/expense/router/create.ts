import { Request, Response, Router } from "express";
import create from "../operations/create";
import { findCategory } from "../../category/operations/find";
import { formatClientDate, formatServerDate } from "../formatDate";

const router = Router();

router.post("/", async (request: Request, response: Response) => {
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
    .then((expense) =>
      response.status(201).json({
        message: `Expense successfully created`,
        expense: {
          ...expense.dataValues,
          createdAt: formatServerDate(expense?.createdAt),
          category,
        },
      }),
    )
    .catch((error) => {
      console.error(`An error occurred while creating expense: ${error}`);
      response.status(500).send({
        message: "An error occurred while creating expense. Please try again",
      });
    });
});

export default router;
