import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import validate from "../../middleware/validation/signup/validate";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";
import sendCodeToEmail from "./sendCode";
import handleError from "../../middleware/errorHandler";

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
    .catch(redisError);
}

router.post(
  "/",
  validate(),
  handleError,
  async (request: Request, response: Response) => {
    const { username, email, password } = request.body;

    await saveCandidateData(username, email, password, redisStore);
    await sendCodeToEmail(email);

    response.status(200).json({
      message: "Valid user data",
    });
  },
);

export default router;
