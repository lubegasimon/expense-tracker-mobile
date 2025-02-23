import { Router, Request, Response } from "express";
import models from "../../models";

const router = Router();

router.get("/", async (_request: Request, response: Response) => {
  const rows = await models.Expense.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["createdAt", "DESC"]],
  });

  response.status(200).json({ message: rows });
});

export default router;
