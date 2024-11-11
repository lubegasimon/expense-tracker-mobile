import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.set({
    "Content-Type": "application/json",
  });
  res.json({ message: "Welcome, please create account / login" });
});

export default router;
