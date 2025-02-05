import create from "../../../category/operations/create";
import { sequelize } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import deleteCategory from "../../../category/operations/delete";

const id = uuidv4();

describe("DELETE category", () => {
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());

  it("should delete category", async () => {
    const createdCategory = await create({
      id,
      name: "Transportation",
      description:
        "Costs for fuel, car maintenance, public transportation, car registration et cetera",
    });
    expect(createdCategory).toHaveProperty("name", "Transportation");

    const result = await deleteCategory(id);
    expect(result).toEqual(1);
  });

  it("should return 0 if category with specified ID doesn't exist", async () => {
    const invalidId = uuidv4();
    const result = await deleteCategory(invalidId);
    expect(result).toStrictEqual(0);
  });
});
