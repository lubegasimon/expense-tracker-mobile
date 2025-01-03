import { Request, Response, Router } from "express";
import validateCreateCategoryRequest from "../../middleware/validation/category/validate";
import create from "../../category/create";
import { findCategory } from "../../category/find";

const router = Router();

router.post(
  "/",
  validateCreateCategoryRequest(),
  async (request: Request, response: Response) => {
    const { name, details } = request.body;
    const category = await findCategory(name);
    if (category)
      response.status(409).json({ message: "Category already exists" });
    else
      await create({ name, details })
        .then((category) => {
          return response.status(201).json({
            message: `Category ${name} successfully created`,
            category: {
              id: category.id,
              name,
              details,
            },
          });
        })
        .catch((error) => {
          console.error(`An error occurred while creating category: ${error}`);
          return response.status(500).json({
            message:
              "An error occurred while creating category. Please try again",
          });
        });
  },
);

export default router;
