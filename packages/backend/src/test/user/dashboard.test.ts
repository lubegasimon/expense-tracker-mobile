import request from "supertest";
import app from "./app";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("GET /dashboard", () => {
  const mockedToken = "json.web.token";

  const mockedJwtSign = jwt.sign as jest.Mock;

  mockedJwtSign.mockReturnValue(mockedToken);

  it("should return 401 and deny access dashboard", async () => {
    const response = await request(app).get("/dashboard").expect(401);

    expect(response.body.error).toBe("Unauthorised access");
    expect(response.body.message).toBe("Please login to access this resource.");
  });
});
