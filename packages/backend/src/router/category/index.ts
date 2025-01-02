import { Request, Response, Router } from "express";
import models from "../../models";

const router = Router();

router.get("/", async (_request: Request, response: Response) => {
  const rows = await models.Category.findAll({
    offset: 0,
    limit: 5,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  response.status(200).json({ message: rows });
});

export default router;
