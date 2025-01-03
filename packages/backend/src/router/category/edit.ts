import { Request, Response, Router } from "express";
import updateCategory from "../../category/update";
import { findCategoryById } from "../../category/find";

const router = Router();

router.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const { name, details } = request.body;
  if (!name) response.status(400).json({ message: "Name is required" });
  else {
    await updateCategory(id, name, details);
    await findCategoryById(id)
      .then((category) => {
        if (!category)
          response.status(404).json({ message: "Category not found" });
        else
          response.status(200).json({
            message: `Category is successfully updated`,
            category,
          });
      })
      .catch((error) => {
        console.error(`An error occured while updating category: ${error}`);
        response
          .status(500)
          .json({ message: "Something went wrong. Please try again" });
      });
  }
});

export default router;
