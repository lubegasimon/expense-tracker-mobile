import { Router, Request, Response } from "express";
import models from "../../models";

const router = Router();

router.get("/", async (_request: Request, response: Response) => {
  const expenses = await models.Expense.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["createdAt", "DESC"]],
  });

  response.status(200).json({ expenses });
});

export default router;
