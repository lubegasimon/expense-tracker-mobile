import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../db/db";
import models from "../../../models";
import create from "../../../category/create";

const id = uuidv4();
const category = {
  id,
  name: "Water",
  details: "Water bill",
};

describe("PUT /category/:id", () => {
  afterAll(async () => await models.Category.destroy({ truncate: true }));
  afterAll(() => sequelize.close());

  it("should return 200 when category update is successful", async () => {
    await create(category);
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        name: "Electricity",
        details: "Electricity bills",
      })
      .expect(200);
    expect(response.body.message).toBe("Category successfully updated");
    expect(response.body.category).toHaveProperty("name", "Electricity");
    expect(response.body.category).toHaveProperty(
      "details",
      "Electricity bills",
    );
    expect(response.body.category).toHaveProperty("id", `${id}`);
  });

  it("should return 200 when category details is not provided", async () => {
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        name: "Electricity",
      })
      .expect(200);
    expect(response.body.message).toBe("Category successfully updated");
    expect(response.body.category).toHaveProperty("name", "Electricity");
    expect(response.body.category).toHaveProperty("id", `${id}`);
  });

  it("should return 200 when category update is successfull", async () => {
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        name: "Internet",
        details: "",
      })
      .expect(200);
    expect(response.body.message).toBe("Category successfully updated");
    expect(response.body.category).toHaveProperty("name", "Internet");
    expect(response.body.category).toHaveProperty("details", "");
    expect(response.body.category).toHaveProperty("id", `${id}`);
  });

  it("should return 400 when category name is not provided", async () => {
    const response = await request(app)
      .put(`/category/${id}`)
      .send({
        details: "Electricity bills",
      })
      .expect(400);
    expect(response.body.message).toBe("Name is required");
  });

  it("should return 404 if a category ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .put(`/category/${invalidId}`)
      .send({ name: "Rent" })
      .expect(404);
    expect(response.body.message).toBe("Category not found");
  });
});
