import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../category/create";
import { v4 as uuidv4 } from "uuid";

describe("GET /category", () => {
  afterAll(async () => await models.Category.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return 200 and fetch categories", async () => {
    const id = uuidv4();
    await create({
      name: "Water",
      details: "Water bill",
      id,
    });
    const response = await request(app).get("/category").expect(200);
    expect(response.body.message).toStrictEqual([
      {
        name: "Water",
        details: "Water bill",
        id,
      },
    ]);
  });
});
