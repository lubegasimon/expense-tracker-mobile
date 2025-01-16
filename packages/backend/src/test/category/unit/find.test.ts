import { v4 as uuidv4 } from "uuid";
import create from "../../../category/create";
import { findCategoryById } from "../../../category/find";
import { sequelize } from "../../../db/db";
import models from "../../../models";

const id = uuidv4();

const category = {
  id,
  name: "Water",
  details: "Water bill",
};

describe("find category name", () => {
  afterEach(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());

  it("should return category if it exists", async () => {
    await create(category);
    const result = await findCategoryById(id);
    expect(result).toHaveProperty("name", "Water");
    expect(result).toHaveProperty("id", id);
  });

  it("should return null if category does not exist or is empty", async () => {
    const invalidId = uuidv4();
    const result = await findCategoryById(invalidId);
    expect(result).toBeNull();
  });
});
