import { v4 as uuidv4 } from "uuid";
import { create } from "../../user/create";
import { sequelize } from "../../db/db";
import { findUserByEmail } from "../../user/find";

const user = {
  id: uuidv4(),
  username: "johndoe",
  email: "john@doe.com",
  password: "johndoe",
};

describe.only("Find by email", () => {
  beforeEach(() => sequelize.truncate());

  afterAll(() => sequelize.close());

  it("should return user if email exists", () => {
    return create(user).then((_result) =>
      findUserByEmail("john@doe.com").then((result) =>
        expect(result).toHaveProperty("email", "john@doe.com"),
      ),
    );
  });

  it("should return null if email does not exist or is empty", () => {
    return create(user).then((_result) =>
      findUserByEmail("john@doe.net").then((result) => {
        expect(result).toBeNull();
      }),
    );
  });
});
