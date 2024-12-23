import express from "express";
import signupRouter from "../../router/user/signup";
import verifyCodeRouter from "../../router/user/verifyCode";
import dashboardRouter from "../../router/user/dashboard";
import resendCodeRouter from "../../router/user/resendCode";
import loginRouter from "../../router/user/login";
import handleError from "../../middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/signup", signupRouter);
app.use("/signup/verify-code", verifyCodeRouter);
app.use("/dashboard", dashboardRouter);
app.use("/signup/resend-code", resendCodeRouter);
app.use("/login", loginRouter);
app.use(handleError);

/* exports express app for the tests */
export default app;
