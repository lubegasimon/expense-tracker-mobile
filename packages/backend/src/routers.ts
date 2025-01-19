import { Router } from "express";
import userRouters from "./user/router";
import categoryRouters from "./category/router";
import expenseRouters from "./expense/router";

const router = Router();

router.use(userRouters);
router.use(categoryRouters);
router.use(expenseRouters);

export default router;
