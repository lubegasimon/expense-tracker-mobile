import { Router, Request, Response } from "express";
import validate from "../../middleware/validation/validateRequestBody";
const router = Router();

router.post("/", validate("user"), (_reqest: Request, response: Response) => {
  response.status(200).send({ message: "Valid user data" });
});

export default router;
