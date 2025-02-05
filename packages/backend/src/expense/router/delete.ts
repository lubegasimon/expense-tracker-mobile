import { Router, Request, Response } from "express";
import models from "../../models";

const router = Router();

router.delete("/:id", (request: Request, response: Response) => {
  const id = request.params.id;

  models.Expense.destroy({ where: { id } })
    .then((result) => {
      if (result === 0)
        return response.status(404).json({ message: "Expense not found" });
      return response
        .status(200)
        .json({ message: "Expense successfully deleted" });
    })
    .catch((error) => {
      console.error(`An error occured while deleting expense: ${error}`);
      return response.status(500).json({
        message: "An error occurred while deleting expense. Please try again",
      });
    });
});

export default router;
