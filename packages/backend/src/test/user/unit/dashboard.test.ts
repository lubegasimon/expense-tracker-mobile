import request from "supertest";
import app from "../../app";
import { closeRedisClient } from "../../../middleware/session";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "json.web.token"),
}));

describe("GET /dashboard", () => {
  afterAll(() => closeRedisClient());
  it("should return 401 and deny access dashboard", async () => {
    const response = await request(app).get("/dashboard").expect(401);

    expect(response.body.error).toBe("Unauthorised access");
    expect(response.body.message).toBe("Please login to access this resource.");
  });
});
