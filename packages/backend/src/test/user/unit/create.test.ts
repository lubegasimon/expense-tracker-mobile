import create from "../../../user/operations/create";
import { sequelize } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import models from "../../../models";
import { closeRedisClient } from "../../../middleware/session";

const user = {
  id: uuidv4(),
  username: "john_",
  email: "john@doe.com",
  password: "johndoe",
};

describe("User CRUD operation", () => {
  afterEach(async () => await models.User.destroy({ truncate: true }));
  afterAll(async () => await sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("create user", async () => {
    return await create(user).then((user) =>
      expect(user).toHaveProperty("username", "john_"),
    );
  });
});
