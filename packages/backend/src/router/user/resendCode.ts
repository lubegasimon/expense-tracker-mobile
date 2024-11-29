import { Router, Request, Response } from "express";
import sendCodeToEmail from "./sendCode";
const router = Router();

router.post("/", async (request: Request, response: Response) => {
  const data = request.body;
  await sendCodeToEmail(data.email);

  response
    .status(200)
    .json({ message: "A new verification code has been sent to your email" });
});

export default router;
