import { Request, Response, Router } from "express";
const router = Router();

router.post("/", async (request: Request, response: Response) => {
  const data = await request.body;
  response.status(200).json({ message: "Valid code", code: data.code });
});

export default router;
