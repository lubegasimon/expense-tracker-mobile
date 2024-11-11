import cookieParser from "cookie-parser";

import app from "./server";
import indexRouter from "./router/user/index";
import signupRouter from "./router/user/signup";
import { sessionManager } from "./middleware/session";
import { logger } from "./middleware/logger";

const port = 3000;

app.use(cookieParser());
app.use(sessionManager);
app.use(logger);

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n`);
});
