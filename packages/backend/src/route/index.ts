import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.set({
    "Content-Type": "application/json",
  });
  res.json({ message: "Create account" });
});

export default router;
