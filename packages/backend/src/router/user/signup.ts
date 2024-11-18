import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import { randomInt } from "crypto";
import validate from "../../middleware/validation/validateRequestBody";
import { redisClient, redisStore } from "../../middleware/session";
import { redisError } from "./error";

const router = Router();

const verificationCode = () => {
  randomInt(1000, 9999, (error, code) => {
    if (error) throw error;
    code.toString();
  });
};

async function associateCodeToEmail(email: string) {
  await redisStore.client
    .set(`verification:${verificationCode}`, email, 300)
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
    await associateCodeToEmail(data.email);

    const savedCandidateData = await redisClient
      .get(`signup:${data.email}`)
      .catch((error) => redisError(error));

    const savedVerificationCode = await redisClient
      .get(`verification:${verificationCode}`)
      .catch((error) => redisError(error));

    response
      .status(200)
      .send({
        message: "Valid user data",
        savedCandidateData,
        savedVerificationCode,
      });
  },
);

export default router;
