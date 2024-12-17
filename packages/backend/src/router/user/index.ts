import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (_request: Request, response: Response) => {
  response.set({
    "Content-Type": "application/json",
  });
  response.json({ message: "Welcome, please create account / login" });
});

export default router;
