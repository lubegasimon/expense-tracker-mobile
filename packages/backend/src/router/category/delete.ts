import { Request, Response, Router } from "express";
import deleteCategory from "../../category/delete";
import { findCategoryById } from "../../category/find";

const router = Router();

router.delete("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const category = await findCategoryById(id);
  if (!category) response.status(404).json({ message: "Category not found" });
  else {
    deleteCategory(id)
      .then((result) => {
        if (result !== 1)
          return response.status(500).json({
            message: `Failed to delete the category. Please try again`,
          });
        return response
          .status(200)
          .json({ message: "Category successfully deleted" });
      })
      .catch((error) => {
        console.error(`An error occured while deleting category: ${error}`);
        return response
          .status(500)
          .json({ message: "Something went wrong. Please try again" });
      });
  }
});

export default router;
