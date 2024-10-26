import session from "express-session";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

import app from "./server";
import indexRouter from "./route/index";
import signupRouter from "./route/signup";
import { redisStore } from "./middleware/redis";
import { secret } from "./config";
import { logger } from "./middleware/logger";

const port: number = 3000;

app.use(cookieParser());
app.use(
  session({
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
  }),
);
app.use(logger);

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} \n`);
});
