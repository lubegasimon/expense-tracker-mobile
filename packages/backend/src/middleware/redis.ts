import RedisStore from "connect-redis";
import { createClient } from "redis";

let redisClient = createClient();
redisClient.connect().catch(console.error);

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
