import request from "supertest";
import app from "../app";

const user = {
  username: "johndoe",
  email: "johnn@doe.com",
  password: "johndoe",
  confirmPassword: "johndoe",
};

// TODO: Use stubs to avoid generating and sending different codes and emails respectively.
describe("Check if candidate data is saved in Redis", () => {
  it("should return saved candidate's data ", async () => {
    const response = await request(app).post("/signup").send(user);
    expect(response.body.savedCandidateData).toBe(
      '{"username":"johndoe","email":"johnn@doe.com","password":"johndoe"}',
    );
  });

  it("should return 200 email to candidate's email", async () => {
    const response = await request(app).post("/signup").send({
      username: "johndoe",
      email: "lubegasimon73@gmail.com",
      password: "johndoe",
      confirmPassword: "johndoe",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.sendEmailStatus).toBe("Email sent");
  });
});
