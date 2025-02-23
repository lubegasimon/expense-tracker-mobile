import { Router } from "express";
import indexRouter from "./router/index";
import createRouter from "./router/create";
import editRouter from "./router/edit";
import deleteRouter from "./router/delete";
import { expenseByIdRouter, expensesByDateRouter } from "./router/find";

const router = Router();

router.use("/expense", indexRouter);
router.use("/expense/create", createRouter);
router.use("/expense", editRouter);
router.use("/expense", deleteRouter);
router.use("/expense", expenseByIdRouter);
router.use("/expenses", expensesByDateRouter);

export default router;
