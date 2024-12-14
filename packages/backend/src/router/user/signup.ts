import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import validate from "../../middleware/validation/validateRequestBody";
import { redisClient, redisStore } from "../../middleware/session";
import { redisError } from "./error";
import sendCodeToEmail from "./sendCode";

const router = Router();

async function saveCandidateData(
  username: string,
  email: string,
  password: string,
  redisStore: RedisStore,
) {
  const candidateData = JSON.stringify({ username, email, password });
  let signupKey = `signup:${email}`;
  await redisStore.client
    .set(signupKey, candidateData)
    .then(() => redisStore.client.expire(signupKey, 86400))
    .catch((error) => redisError(error));
}

router.post(
  "/",
  validate("signupBodySchema"),
  async (request: Request, response: Response) => {
    const data = request.body;
    const { username, email, password } = data;

    await saveCandidateData(username, email, password, redisStore);
    const sendEmailStatus = await sendCodeToEmail(email);

    const savedCandidateData = await redisClient
      .get(`signup:${email}`)
      .catch((error) => redisError(error));

    const savedVerificationCode = await redisClient
      .get(`verification:${email}`)
      .catch((error) => redisError(error));

    response.status(200).json({
      message: "Valid user data",
      savedCandidateData,
      savedVerificationCode,
      sendEmailStatus,
    });
  },
);

export default router;
