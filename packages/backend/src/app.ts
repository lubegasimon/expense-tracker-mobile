import morgan from "morgan";
import session from "express-session";

import app from "./server";
import indexRouter from "./route/index";
import signupRouter from "./route/signup";
import { redisStore } from "./middleware/redis";
import { secret } from "./config";

const port: number = 3000;

app.use(morgan("tiny"));
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret,
  }),
);

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
