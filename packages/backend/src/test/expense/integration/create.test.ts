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
        createdAt: "06/02/2025",
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

  it("should return 201 when details, category, and createdAt are not provided", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({
        name: "Water bill",
        amount: 20,
      })
      .expect(201);
    expect(response.body.message).toBe("Expense successfully created");
    expect(response.body.expense).toHaveProperty("name", "Water bill");
    expect(response.body.expense).toHaveProperty("amount", "20.00");
    expect(response.body.expense).toHaveProperty("id");
    expect(response.body.expense).toHaveProperty("createdAt");
    expect(response.body.expense.details).toBeNull();
    expect(response.body.expense.categoryId).toBeNull();
  });

  it("should return 400 when expense name and amount are missing", async () => {
    const response = await request(app)
      .post("/expense/create")
      .send({})
      .expect(400);
    expect(response.body.error.name).toBe("name is required");
    expect(response.body.error.amount).toBe("amount is required");
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
        "Invalid date format. Expected for example 01/12/2025",
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
        "Invalid date format. Expected for example 01/12/2025",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is dd-mm-yyyy", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "01-12-2025",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example 01/12/2025",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is mm/dd/yyyy", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "12/31/2025",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example 01/12/2025",
      );
      expect(response.body.expense).toBeUndefined();
    });

    it("should return 400 when createdAt format is yyyy/mm/dd", async () => {
      const response = await request(app)
        .post("/expense/create")
        .send({
          name: "Water bill",
          amount: 20,
          createdAt: "2025/12/01",
        })
        .expect(400);
      expect(response.body.error.createdAt).toBe(
        "Invalid date format. Expected for example 01/12/2025",
      );
      expect(response.body.expense).toBeUndefined();
    });
  });
});
