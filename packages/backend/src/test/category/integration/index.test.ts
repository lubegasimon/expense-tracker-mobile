import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../category/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();

const category = {
  name: "Water",
  details: "Water bill",
  id,
};

describe("GET /category", () => {
  afterAll(
    async () =>
      await models.Category.destroy({ truncate: true, cascade: true }),
  );
  afterAll(() => sequelize.close());
  afterAll(async () => {
    await closeRedisClient();
  });

  it("should return 200 and fetch categories", async () => {
    await create(category);
    const response = await request(app).get("/category").expect(200);
    expect(response.body.message).toStrictEqual([category]);
  });
});
