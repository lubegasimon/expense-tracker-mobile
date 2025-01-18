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
import loginRouter from "./router/user/login";
import categoryRouter from "./router/category/index";
import createCategoryRouter from "./router/category/create";
import editCategoryRouter from "./router/category/edit";
import deleteCategoryRouter from "./router/category/delete";
import expenseRouter from "./router/expense/index";
import createExpenseRouter from "./router/expense/create";
import editExpenseRouter from "./router/expense/edit";
import handleError from "./middleware/errorHandler";

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
app.use("/login", loginRouter);
app.use("/category", categoryRouter);
app.use("/category/create", createCategoryRouter);
app.use("/category", editCategoryRouter);
app.use("/category", deleteCategoryRouter);
app.use("/expense", expenseRouter);
app.use("/expense/create", createExpenseRouter);
app.use("/expense", editExpenseRouter);

app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n`);
});
