import RedisStore from "connect-redis";
import { createClient } from "redis";
import { redisError } from "../router/user/error";

const redisClient = createClient();

redisClient.connect().catch((error) => redisError(error));

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "expense-tracker:",
});

const user = {
  username: "johndoe",
  email: "john@doe.com",
  password: "johndoe",
};

describe("Redis operations", () => {
  afterAll(() => redisClient.disconnect().catch((error) => redisError(error)));

  it("should add data in Redis", async () => {
    const data = JSON.stringify(user);
    const response = await redisStore.client
      .set(`signup:${user.email}`, data, 1)
      .catch((error) => redisError(error));

    expect(response).toBe("OK");
  });

  it("should return null for invalid redis key", async () => {
    const response = await redisStore.client
      .get(`signup:*`)
      .catch((error) => redisError(error));

    expect(response).toBe(null);
  });

  it("should return data associated to redis key", async () => {
    const response = await redisStore.client
      .get(`signup:${user.email}`)
      .catch((error) => redisError(error));

    console.log("Response", response);
    expect(response).toBe(
      '{"username":"johndoe","email":"john@doe.com","password":"johndoe"}',
    );
  });

  it("should set verification:<email> key and expiry in Redis", async () => {
    const data = JSON.stringify(user);
    const response = await redisStore.client
      .set(`verification:${user.email}`, data)
      .then((_) => redisStore.client.expire(`verification:${user.email}`, -1))
      .catch((error) => redisError(error));

    expect(response).toBe(true);
  });

  it("should fail to retrieve data when key expires", async () => {
    const response = await redisStore.client
      .get(`verification:${user.email}`)
      .catch((error) => redisError(error));

    expect(response).toBe(null);
  });
});
