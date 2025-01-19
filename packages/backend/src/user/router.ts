import { Router } from "express";
import indexRouter from "./router/index";
import signupRouter from "./router/signup";
import verifyCode from "./router/verifyCode";
import dashboardRouter from "./router/dashboard";
import resendCodeRouter from "./router/resendCode";
import loginRouter from "./router/login";

const router = Router();

router.use("/", indexRouter);
router.use("/signup", signupRouter);
router.use("/signup/verify-code", verifyCode);
router.use("/dashboard", dashboardRouter);
router.use("/signup/resend-code", resendCodeRouter);
router.use("/login", loginRouter);

export default router;
