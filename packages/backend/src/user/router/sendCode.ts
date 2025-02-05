import { randomInt } from "crypto";
import sgMail from "@sendgrid/mail";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";
import { sendGridApiKey, senderEmail } from "../../config";

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
  redisStore.client
    .set(`verification:${email}`, code)
    .then(() => redisStore.client.expire(`verification:${email}`, 300))
    .catch(redisError);

  sgMail.setApiKey(sendGridApiKey);

  const message = {
    to: email,
    from: senderEmail,
    subject: "Expense-tracker: Verification code",
    text: `Verification code`,
    html: `Code <strong>${code}</strong> expires in 5 minutes.`,
  };

  return sgMail
    .send(message)
    .then((response) => {
      //TODO: Use event webhooks -- https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook
      if (response[0].statusCode) return "Email sent";
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Something went wrong while sending code to the email");
    });
}

export default sendCodeToEmail;
