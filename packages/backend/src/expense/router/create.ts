import { Request, Response, Router } from "express";
import create from "../operations/create";
import { findCategoryById } from "../../category/operations/find";

const router = Router();

router.post("/", async (request: Request, response: Response) => {
  const { name, amount, details, date, categoryId } = request.body;

  const category = await findCategoryById(categoryId);
  await create({ name, amount, details, createdAt: date, categoryId })
    .then((expense) =>
      response.status(201).json({
        message: `Expense successfully created`,
        expense: {
          id: expense.id,
          name,
          amount,
          details,
          date,
          category: category ? category.name : "",
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
