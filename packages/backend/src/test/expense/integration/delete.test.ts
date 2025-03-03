import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import create from "../../../expense/operations/create";
import { closeRedisClient } from "../../../middleware/session";

const id = uuidv4();
const expense = {
  name: "Fruits",
  amount: 10,
  id,
  createdAt: new Date("2025-02-06T00:00:00.000Z"),
};

describe("DELETE /expense/:id", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 200 when expense is successfully deleted", async () => {
    await create(expense);
    const response = await request(app).delete(`/expense/${id}`).expect(200);
    expect(response.body.message).toBe(`Expense successfully deleted`);
  });

  it("should return 404 if a expense ID is invalid", async () => {
    const invalidId = uuidv4();
    const response = await request(app)
      .delete(`/expense/${invalidId}`)
      .expect(404);
    expect(response.body.error).toBe("Expense not found");
  });
});
