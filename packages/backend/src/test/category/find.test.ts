import { v4 as uuidv4 } from "uuid";
import create from "../../category/create";
import { sequelize } from "../../db/db";
import findCategoryName from "../../category/find";
import models from "../../models";

const category = {
  id: uuidv4(),
  name: "Water",
  details: "Water bill",
};

describe("find category name", () => {
  afterEach(async () => await models.Category.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return category name if it exists", async () => {
    await create(category);
    const result = await findCategoryName("Water");
    expect(result).toHaveProperty("name", "Water");
  });

  it("should return null if category name does not exist or is empty", async () => {
    await create(category);
    const result = await findCategoryName("Electricity");
    expect(result).toBeNull();
  });
});
