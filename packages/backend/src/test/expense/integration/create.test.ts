import request from "supertest";
import app from "../../app";
import { sequelize } from "../../../../db/db";
import models from "../../../models";
import createCategory from "../../../category/operations/create";
import { closeRedisClient } from "../../../middleware/session";

describe("POST /expense/create", () => {
  afterAll(() => models.Expense.destroy({ truncate: true }));
  afterAll(() => models.Category.destroy({ truncate: true, cascade: true }));
  afterAll(() => sequelize.close());
  afterAll(() => closeRedisClient());

  it("should return 201 when expense is created", async () => {
    const category = await createCategory({ name: "Utility" });
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20.99,
        category: category.name,
        createdAt: "02/06/2025",
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toHaveProperty("name", "Water bill");
    expect(response.body.expense).toHaveProperty("amount", "20.99");
    expect(response.body.expense).toHaveProperty("id");
    expect(response.body.expense).toHaveProperty("categoryId", category.id);
    expect(response.body.expense).toHaveProperty(
      "createdAt",
      "2025-02-06T00:00:00.000Z",
    );
  });

  it("should return 201 when details and category are not provided", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20,
        createdAt: "02/06/2025",
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toHaveProperty("name", "Water bill");
    expect(response.body.expense).toHaveProperty("amount", "20.00");
    expect(response.body.expense).toHaveProperty("id");
    expect(response.body.expense).toHaveProperty(
      "createdAt",
      "2025-02-06T00:00:00.000Z",
    );
    expect(response.body.expense.details).toBeNull();
    expect(response.body.expense.categoryId).toBeNull();
  });

  it("should return 400 when expense name, amount, and creeatedAt are missing", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({})
      .expect(400);
    expect(response.body.error.name).toBe("name is required");
    expect(response.body.error.amount).toBe("amount is required");
    expect(response.body.error.createdAt).toBe("date is required");
    expect(response.body.expense).toBeUndefined();
  });

  describe("Should return 400 when createdAt format in invalid", () => {
    it("should return 400 when createdAt is an empty string", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example MM/DD/YYYY",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt is empty string with space", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: " ",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example MM/DD/YYYY",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is MM-DD-YYYY", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "12-28-2025",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example MM/DD/YYYY",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is DD/MM/YYYY", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "28/12/2025",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example MM/DD/YYYY",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is YYYY/MM/DD", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "2025/12/28",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example MM/DD/YYYY",
      );
      expect(response.body.expense).toBeUndefined();
    });
  });
});
