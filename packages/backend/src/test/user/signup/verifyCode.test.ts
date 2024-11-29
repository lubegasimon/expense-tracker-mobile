import request from "supertest";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import app from "../app";
import { sequelize } from "../../../db/db";
import create from "../../../user/create";

const redisClient = createClient();

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

const user = {
  username: "johndoe",
  email: "john@doe.com",
  password: "johndoe",
};

const CODE = "1234";

describe("Redis operations", () => {
  afterEach(() => sequelize.truncate());
  afterEach(() =>
    redisStore.client
      .del([`signup:${user.email}`, `verification:${user.email}`])
      .catch(console.error),
  );
  afterAll(() => sequelize.close());
  afterAll(() => redisClient.disconnect().catch(console.error));

  it("should return 201 and create user account if code is valid and email is not taken", async () => {
    const data = JSON.stringify(user);

    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${user.email}`, CODE))
      .catch(console.error);

    const response = await request(app).post("/signup/verify-code").send({
      email: user.email,
      code: CODE,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Successfully signed in");
  });

  it("should return 409 if email exists but code is valid", async () => {
    await create(user);
    const data = JSON.stringify(user);
    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${user.email}`, CODE))
      .catch(console.error);

    const response = await request(app).post("/signup/verify-code").send({
      email: user.email,
      code: CODE,
    });
    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe("Email already exists");
  });

  it("should 400 when code is invalid", async () => {
    const data = JSON.stringify(user);
    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${user.email}`, CODE))
      .catch(console.error);

    const response = await request(app).post("/signup/verify-code").send({
      email: user.email,
      code: "0000",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid code");
  });

  it("should 400 when code is not provided", async () => {
    const data = JSON.stringify(user);
    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${user.email}`, CODE))
      .catch(console.error);

    const response = await request(app).post("/signup/verify-code").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "Verification code expired or invalid email. Please request new code",
    );
  });

  it("should return 401 when user data expires", async () => {
    const data = JSON.stringify(user);

    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() =>
        redisStore.client
          .set(`verification:${user.email}`, CODE)
          .then(() => redisStore.client.expire(`signup:${user.email}`, -1)),
      )
      .catch(console.error);

    const response = await request(app)
      .post("/signup/verify-code")
      .send({ email: user.email, code: CODE });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(
      "Your session has expired. Please start new signup process",
    );
  });

  it("should return 400 when the code expires", async () => {
    const data = JSON.stringify(user);

    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() =>
        redisStore.client
          .set(`verification:${user.email}`, CODE)
          .then(() =>
            redisStore.client.expire(`verification:${user.email}`, -1),
          ),
      )
      .catch(console.error);

    const response = await request(app)
      .post("/signup/verify-code")
      .send({ email: user.email, code: CODE });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "Verification code expired or invalid email. Please request new code",
    );
  });
});
