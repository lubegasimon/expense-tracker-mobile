import express from "express";
import signupRouter from "../../router/user/signup";
import verifyCodeRouter from "../../router/user/verifyCode";

const app = express();

app.use(express.json());
app.use("/signup", signupRouter);
app.use("/signup/verify-code", verifyCodeRouter);

/* exports express app to run on tests */
export default app;
