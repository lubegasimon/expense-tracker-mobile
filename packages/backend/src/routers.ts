import { Router } from "express";
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
import deleteExpenseRouter from "./router/expense/delete";

const router = Router();

router.use("/", indexRouter);
router.use("/signup", signupRouter);
router.use("/signup/verify-code", verifyCode);
router.use("/dashboard", dashboardRouter);
router.use("/signup/resend-code", resendCodeRouter);
router.use("/login", loginRouter);
router.use("/category", categoryRouter);
router.use("/category/create", createCategoryRouter);
router.use("/category", editCategoryRouter);
router.use("/category", deleteCategoryRouter);
router.use("/expense", expenseRouter);
router.use("/expense/create", createExpenseRouter);
router.use("/expense", editExpenseRouter);
router.use("/expense", deleteExpenseRouter);

export default router;
