import { create } from "../../user/create";
import { sequelize } from "../../db/db";
import { v4 as uuidv4 } from "uuid";

const user = {
  id: uuidv4(),
  username: "john_",
  email: "john@doe.com",
  password: "johndoe",
};

describe("User CRUD operation", () => {
  beforeEach(() => sequelize.truncate());

  afterEach(() => sequelize.truncate());

  afterAll(() => sequelize.close());

  it("create user", () => {
    return create(user).then((user) =>
      expect(user).toHaveProperty("username", "john_"),
    );
  });
});