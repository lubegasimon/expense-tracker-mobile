import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import validate from "../../middleware/validation/validateRequestBody";
import { redisClient, redisStore } from "../../middleware/session";
import { redisError } from "./error";

const router = Router();

async function saveCandidateData(
  username: string,
  email: string,
  password: string,
  redisStore: RedisStore,
) {
  const candidateData = JSON.stringify({ username, email, password });
  await redisStore.client
    .set(`signup:${email}`, candidateData, 86400)
    .catch((error) => redisError(error));
}

router.post(
  "/",
  validate("user"),
  async (request: Request, response: Response) => {
    const data = request.body;
    const { username, email, password } = data;

    await saveCandidateData(username, email, password, redisStore);
    const savedCandidateData = await redisClient
      .get(`signup:${data.email}`)
      .catch((error) => redisError(error));

    response
      .status(200)
      .send({ message: "Valid user data", savedCandidateData });
  },
);

export default router;
