import { Router } from "express";
import indexRouter from "./router/index";
import createRouter from "./router/create";
import editRouter from "./router/edit";
import deleteRouter from "./router/delete";
import findRouter from "./router/find";

const router = Router();

router.use("/category", indexRouter);
router.use("/category/create", createRouter);
router.use("/category", editRouter);
router.use("/category", deleteRouter);
router.use("/category", findRouter);

export default router;
