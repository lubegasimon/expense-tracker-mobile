import express from "express";
import cookieParser from "cookie-parser";
import app from "./server";
import { sessionManager } from "./middleware/session";
import { logger } from "./middleware/logger";
import indexRouter from "./router/user/index";
import signupRouter from "./router/user/signup";
import verifyCode from "./router/user/verifyCode";
import dashboardRouter from "./router/user/dashboard";
import resendCodeRouter from "./router/user/resendCode";

const port = 3000;

app.use(cookieParser());
app.use(sessionManager);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/signup/verify-code", verifyCode);
app.use("/dashboard", dashboardRouter);
app.use("/signup/resend-code", resendCodeRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n`);
});
