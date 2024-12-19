import { Router, Request, Response } from "express";
import initializeSession from "./auth";
import validate from "../../middleware/validation/login/validate";
import handleError from "../../middleware/errorHandler";

const router = Router();

router.post(
  "/",
  validate(),
  handleError,
  async (request: Request, response: Response) => {
    const { email } = request.body;
    await initializeSession(email, response);
  },
);

export default router;
