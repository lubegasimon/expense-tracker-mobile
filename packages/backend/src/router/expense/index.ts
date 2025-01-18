import { Router, Request, Response } from "express";
import models from "../../models";

const router = Router();

router.get("/", async (_request: Request, response: Response) => {
  const rows = await models.Expense.findAll({
    limit: 5,
    offset: 0,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  response.status(200).send({ message: rows });
});

export default router;
