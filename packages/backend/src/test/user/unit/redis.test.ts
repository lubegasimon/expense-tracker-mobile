import RedisStore from "connect-redis";
import { createClient } from "redis";

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
  afterAll(() =>
    redisStore.client
      .del([`signup:${user.email}`, `verification:${user.email}`])
      .catch(console.error),
  );
  afterAll(() => redisClient.disconnect().catch(console.error));

  it("should save user data in Redis", async () => {
    const data = JSON.stringify(user);
    const response = await redisStore.client
      .set(`signup:${user.email}`, data)
      .catch(console.error);

    expect(response).toBe("OK");
  });

  it("should return null for invalid redis key", async () => {
    const response = await redisStore.client
      .get(`signup:*`)
      .catch(console.error);

    expect(response).toBe(null);
  });

  it("should return data associated to redis key", async () => {
    const response = await redisStore.client
      .get(`signup:${user.email}`)
      .catch(console.error);

    expect(response).toBe(
      '{"username":"johndoe","email":"john@doe.com","password":"johndoe"}',
    );
  });

  it("should return OK for successful key save in Redis", async () => {
    const response = await redisStore.client
      .set(`verification:${user.email}`, CODE)
      .catch(console.error);

    expect(response).toBe("OK");
  });

  it("should return CODE associated to verification:email key in Redis", async () => {
    const response = await redisStore.client
      .get(`verification:${user.email}`)
      .catch(console.error);

    expect(response).toBe("1234");
  });

  it("should return true and set expiry for verification:email key", async () => {
    const response = await redisStore.client
      .set(`verification:${user.email}`, CODE)
      .then(() => redisStore.client.expire(`verification:${user.email}`, -1))
      .catch(console.error);

    expect(response).toBe(true);
  });

  it("should return null when key expires", async () => {
    const response = await redisStore.client
      .get(`verification:${user.email}`)
      .catch(console.error);

    expect(response).toBe(null);
  });
});
