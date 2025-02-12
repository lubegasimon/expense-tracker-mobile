import { Router, Request, Response } from "express";
import initializeSession from "./auth";
import validate from "../../middleware/validation/login/validate";
import checkEmailExists from "../../middleware/validation/login/checkEmailExists";

const router = Router();

router.post(
  "/",
  validate(),
  checkEmailExists(),
  (request: Request, response: Response) => {
    const { email } = request.body;
    initializeSession(email, response);
  },
);

export default router;
