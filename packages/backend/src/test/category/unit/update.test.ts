import create from "../../../category/create";
import { sequelize } from "../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import updateCategory from "../../../category/update";
import { findCategoryById } from "../../../category/find";

const id = uuidv4();

const category = {
  id,
  name: "Water",
  details: "Water bill",
};

describe("Update category", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());

  it("should update category details", async () => {
    await create(category);
    const [result] = await updateCategory({
      ...category,
      details: "About water bills",
    });
    const updatedCategory = await findCategoryById(id);
    expect(result).toEqual(1);
    expect(updatedCategory).toHaveProperty("details", "About water bills");
  });

  it("should update category name and details", async () => {
    const [result] = await updateCategory({
      id,
      name: "Electricity",
      details: "Electricity bills",
    });
    const updatedCategory = await findCategoryById(id);
    expect(result).toEqual(1);
    expect(updatedCategory).toHaveProperty("name", "Electricity");
    expect(updatedCategory).toHaveProperty("details", "Electricity bills");
  });

  it("should return 0 if category with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const [result] = await updateCategory({ id: invalidId, name: "Water" });
    expect(result).toEqual(0);
  });
});
