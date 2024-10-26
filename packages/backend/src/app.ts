import cookieParser from "cookie-parser";

import app from "./server";
import indexRouter from "./route/index";
import signupRouter from "./route/signup";
import { sessionManager } from "./middleware/session";
import { logger } from "./middleware/logger";

const port = 3000;

app.use(cookieParser());
app.use(sessionManager);
app.use(logger);

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} \n`);
});
