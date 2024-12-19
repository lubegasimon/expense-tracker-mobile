import { Router, Request, Response } from "express";
import initializeSession from "./auth";
import validate from "../../middleware/validation/login/validate";

const router = Router();

router.post("/", validate(), async (request: Request, response: Response) => {
  const data = request.body;
  initializeSession(data.email, response);
});

export default router;
