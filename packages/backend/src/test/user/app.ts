import express from "express";
import signupRouter from "../../user/router";

const app = express();

app.use(express.json());
app.use("/", signupRouter);

/* exports express app to run on tests */
export default app;
