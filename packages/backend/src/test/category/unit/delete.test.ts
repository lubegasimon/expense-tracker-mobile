import create from "../../../category/create";
import { sequelize } from "../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import deleteCategory from "../../../category/delete";

const id = uuidv4();

describe("DELETE category", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());

  it("should delete category", async () => {
    const createdCategory = await create({
      id,
      name: "Water",
      details: "Water bill",
    });
    expect(createdCategory).toHaveProperty("name", "Water");

    const result = await deleteCategory(id);
    expect(result).toEqual(1);
  });

  it("should return 0 if category with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const result = await deleteCategory(invalidId);
    expect(result).toStrictEqual(0);
  });
});
