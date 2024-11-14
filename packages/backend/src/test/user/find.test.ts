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

describe("Find by email", () => {
  beforeEach(() => sequelize.truncate());

  afterAll(() => sequelize.close());

  it("should return user if email exists", async () => {
    await create(user);
    const result = await findUserByEmail("john@doe.com");
    expect(result).toHaveProperty("email", "john@doe.com");
  });

  it("should return null if email does not exist or is empty", async () => {
    await create(user);
    const result = await findUserByEmail("john@doe.net");
    expect(result).toBeNull();
  });
});
