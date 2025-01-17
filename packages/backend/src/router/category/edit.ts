import { Request, Response, Router } from "express";
import updateCategory from "../../category/update";

const router = Router();

router.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const { name, description } = request.body;
  if (!name) response.status(400).json({ message: "Name is required" });
  else
    await updateCategory({ id, name, description })
      .then(([result]) => {
        if (result !== 1)
          return response.status(404).json({ message: "Category not found" });
        return response.status(200).json({
          message: `Category successfully updated`,
          category: { id, name, description },
        });
      })
      .catch((error) => {
        console.error(`An error occured while updating category: ${error}`);
        return response.status(500).json({
          message:
            "An error occurred while updating category. Please try again",
        });
      });
});

export default router;
