import { randomInt } from "crypto";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";

// TODO:
dotenv.config({ path: ".env.test" });

const verificationCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomInt(1000, 10000, (error, code) => {
      if (error) return reject(error);
      resolve(code.toString());
    });
  });
};

async function sendCodeToEmail(email: string) {
  let code = await verificationCode();
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
    .catch((error) => console.error(error));
}

export default sendCodeToEmail;
