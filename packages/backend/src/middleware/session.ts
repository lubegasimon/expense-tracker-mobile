import RedisStore from "connect-redis";
import { createClient } from "redis";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

import { secret } from "../config";

let redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

export const sessionManager = session({
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  secret,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  genid: function (req) {
    return uuidv4();
  },
  name: "session-id-mobile",
});
