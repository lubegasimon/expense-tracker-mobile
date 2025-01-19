import create from "../../../category/operations/create";
import { sequelize } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";

const category = {
  id: uuidv4(),
  name: "Furnishings and Appliances",
  description: "Purchases for furniture, appliances, and decorations",
};

describe("Create category", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());

  it("create category if name doesn't exist", async () => {
    return await create(category).then((category) =>
      expect(category).toHaveProperty("name", "Furnishings and Appliances"),
    );
  });
});
