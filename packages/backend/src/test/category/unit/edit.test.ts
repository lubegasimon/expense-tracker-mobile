import create from "../../../category/operations/create";
import { sequelize } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import editCategory from "../../../category/operations/edit";
import { findCategoryById } from "../../../category/operations/find";

const id = uuidv4();

const category = {
  id,
  name: "Childcare and Education",
};

describe("Update category", () => {
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());

  it("should update category description", async () => {
    await create(category);
    const [result] = await editCategory({
      ...category,
      description:
        "Payment for daycare, school supplies, tuition, extracurricular, et cetera",
    });
    const editedCategory = await findCategoryById(id);
    expect(result).toEqual(1);
    expect(editedCategory).toHaveProperty(
      "description",
      "Payment for daycare, school supplies, tuition, extracurricular, et cetera",
    );
  });

  it("should update category name and description", async () => {
    const [result] = await editCategory({
      id,
      name: "Healthcare",
      description: "Costs for medical treatments, wellness services et cetera",
    });
    const editedCategory = await findCategoryById(id);
    expect(result).toEqual(1);
    expect(editedCategory).toHaveProperty("name", "Healthcare");
  });

  it("should return 0 if category with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const [result] = await editCategory({ id: invalidId, name: "Petcare" });
    expect(result).toEqual(0);
  });
});
