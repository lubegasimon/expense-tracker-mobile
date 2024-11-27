import express from "express";
import signupRouter from "../../router/user/signup";
import verifyCodeRouter from "../../router/user/verifyCode";
import dashboardRouter from "../../router/user/dashboard";

const app = express();

app.use(express.json());
app.use("/signup", signupRouter);
app.use("/signup/verify-code", verifyCodeRouter);
app.use("/dashboard", dashboardRouter);

/* exports express app for the tests */
export default app;
