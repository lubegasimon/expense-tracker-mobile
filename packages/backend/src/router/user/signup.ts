import { Router, Request, Response } from "express";
import RedisStore from "connect-redis";
import { randomInt } from "crypto";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import validate from "../../middleware/validation/validateRequestBody";
import { redisClient, redisStore } from "../../middleware/session";
import { redisError } from "./error";

// TODO:
dotenv.config({ path: ".env.test" });

const router = Router();

const verificationCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomInt(1000, 10000, (error, code) => {
      if (error) return reject(error);
      resolve(code.toString());
    });
  });
};

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

async function sendVerificationEmail(email: string) {
  let code = await verificationCode();

  // associate code to email
  await redisStore.client
    .set(`verification:${email}`, code)
    .then(() => redisStore.client.expire(`verification:${email}`, 300))
    .catch((error) => redisError(error));

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "api-key");

  const message = {
    to: email,
    from: process.env.EXPENSE_TRACKER_EMAIL || "email@example.com",
    subject: "Expense-tracker: Verification code",
    text: `Verification code`,
    html: `Code <strong>${code}</strong> expires in 5 minutes.`,
  };

  return await sgMail
    .send(message)
    .then((response) => {
      //TODO: Use event webhooks -- https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook
      if (!!response[0].statusCode) return "Email sent";
    })
    .catch(console.error);
}

router.post(
  "/",
  validate("user"),
  async (request: Request, response: Response) => {
    const data = request.body;
    const { username, email, password } = data;

    await saveCandidateData(username, email, password, redisStore);
    const sendEmailStatus = await sendVerificationEmail(email);

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
