import { Request, Response, Router } from "express";
import deleteCategory from "../operations/delete";
import { findCategoryById } from "../operations/find";

const router = Router();

router.delete("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const category = await findCategoryById(id);
  if (!category) response.status(404).json({ error: "Category not found" });
  else {
    deleteCategory(id)
      .then((result) => {
        if (result !== 1)
          return response.status(500).json({
            error: `Failed to delete the ${category.name}. Please try again`,
          });
        return response
          .status(200)
          .json({ message: `${category.name} successfully deleted` });
      })
      .catch((error) => {
        console.error(`An error occured while deleting category: ${error}`);
        return response.status(500).json({
          error: "An error occurred while deleting category. Please try again",
        });
      });
  }
});

export default router;
