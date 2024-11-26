import request from "supertest";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { redisError } from "../../../router/user/error";
import app from "../app";
import { sequelize } from "../../../db/db";
import create from "../../../user/create";

const redisClient = createClient();

redisClient.connect().catch((error) => redisError(error));

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
      .del([`signup:${user.email}`, `verification:${CODE}`])
      .catch((error) => redisError(error)),
  );
  afterAll(() => sequelize.close());
  afterAll(() => redisClient.disconnect().catch((error) => redisError(error)));

  it("should fail when code is invalid", async () => {
    const data = JSON.stringify(user);
    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${CODE}`, user.email))
      .catch((error) => redisError(error));

    const response = await request(app).post("/signup/verify-code").send({
      code: "0000",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid code");
  });

  it("should fail to create user account if email exists but code is valid", async () => {
    await create(user);
    const data = JSON.stringify(user);
    await redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${CODE}`, user.email))
      .catch((error) => redisError(error));

    const response = await request(app).post("/signup/verify-code").send({
      code: CODE,
    });
    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe("Email already exists");
  });

  it("should create user account if code is valid and email is not taken", async () => {
    const data = JSON.stringify(user);

    redisStore.client
      .set(`signup:${user.email}`, data)
      .then(() => redisStore.client.set(`verification:${CODE}`, user.email))
      .catch((error) => redisError(error));

    const response = await request(app).post("/signup/verify-code").send({
      code: CODE,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "Account successfully created, welcome johndoe!",
    );
  });

  // FIXME:
  // it("it should fail when the code expires", async () => {
  //   const data = JSON.stringify(user);

  //   await redisStore.client
  //     .set(`signup:${user.email}`, data)
  //     .then(() =>
  //       redisStore.client
  //         .set(`verification:${CODE}`, user.email)
  //         .then(() => redisStore.client.expire(`verification:${CODE}`, -1)),
  //     )
  //     .catch((error) => redisError(error));

  //   const response = await request(app)
  //     .post("/signup/verify-code")
  //     .send({ code: CODE });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.error).toBe("Invalid code");
  // });

  // FIXME:
  // it("it should fail when user data expires", async () => {
  //   const data = JSON.stringify(user);

  //   redisStore.client
  //     .set(`signup:${user.email}`, data)
  //     .then(() =>
  //       redisStore.client
  //         .set(`verification:${CODE}`, user.email)
  //         .then(() => redisStore.client.expire(`signup:${user.email}`, -1)),
  //     )
  //     .catch((error) => redisError(error));

  //   const response = await request(app)
  //     .post("/signup/verify-code")
  //     .send({ code: CODE });

  //     console.log(response.body)
  //   // expect(response.statusCode).toBe(401);
  //   expect(response.body.error).toBe(
  //     "Your session has expired. Please start new signup process",
  //   );
  // });
});
