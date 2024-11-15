import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import { randomBytes } from "crypto";
import validate from "../../middleware/validation/validateRequestBody";
import { redisClient, redisStore } from "../../middleware/session";
import { redisError } from "./error";

const router = Router();

const token = () => {
  randomBytes(10, (error, buffer) => {
    if (error) throw error;
    buffer.toString("hex");
  });
};

async function associateTokenToEmail(email: string) {
  await redisStore.client
    .set(`verification:${token}`, email, 300)
    .catch((error) => redisError(error));
}

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
    await associateTokenToEmail(data.email);

    const savedCandidateData = await redisClient
      .get(`signup:${data.email}`)
      .catch((error) => redisError(error));

    const savedToken = await redisClient
      .get(`verification:${token}`)
      .catch((error) => redisError(error));

    response
      .status(200)
      .send({ message: "Valid user data", savedCandidateData, savedToken });
  },
);

export default router;
