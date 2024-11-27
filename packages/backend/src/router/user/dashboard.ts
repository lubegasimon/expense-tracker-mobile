import { Router, Request, Response } from "express";
import autheticateJwt from "../../middleware/authenticateJwt";

const router = Router();

router.get("/", autheticateJwt, (_request: Request, response: Response) => {
  response.status(200).json({ message: "Welcome, user dashboard placeholder" });
});

export default router;
