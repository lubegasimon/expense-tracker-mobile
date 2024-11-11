import express from "express";
import signupRouter from "../../router/user/signup";

const app = express();

app.use(express.json());
app.use("/signup", signupRouter);

/* exports express app to run on tests */
export default app;
