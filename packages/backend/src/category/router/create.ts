import { Request, Response, Router } from "express";
import validateCreateCategoryRequest from "../../middleware/validation/category/validate";
import create from "../operations/create";
import { findCategory } from "../operations/find";

const router = Router();

router.post(
  "/",
  validateCreateCategoryRequest(),
  async (request: Request, response: Response) => {
    const { name, description } = request.body;
    const category = await findCategory(name);
    if (category)
      response.status(409).json({ error: `${name} already exists` });
    else
      create({ name, description })
        .then((category) => {
          return response.status(201).json({
            message: `${name} successfully created`,
            category: {
              id: category.id,
              name,
              description,
            },
          });
        })
        .catch((error) => {
          console.error(`An error occurred while creating category: ${error}`);
          return response.status(500).json({
            error:
              "An error occurred while creating category. Please try again",
          });
        });
  },
);

export default router;
