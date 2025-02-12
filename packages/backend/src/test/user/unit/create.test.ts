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
  afterEach(() => models.User.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("create user", () =>
    create(user).then((user) =>
      expect(user).toHaveProperty("username", "john_"),
    ));
});
