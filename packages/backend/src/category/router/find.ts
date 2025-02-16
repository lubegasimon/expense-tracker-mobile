import { Router, Request, Response } from "express";
import { findCategoryById } from "../operations/find";

const router = Router();

router.get("/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  findCategoryById(id)
    .then((category) => {
      if (!category)
        return response.status(404).json({ error: "Category not found" });
      else return response.status(200).json({ category });
    })
    .catch((error) => {
      console.error(`Error occurred while fetching category by Id: ${error}`);
      return response.status(500).json({
        error: "An error occurred while updating category. Please try again",
      });
    });
});

export default router;
