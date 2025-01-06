import { Request, Response, Router } from "express";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";
import create from "../../user/create";
import { UserAttrs } from "../../user/model";
import findUserByEmail from "../../user/find";
import initializeSession from "./auth";

const router = Router();

async function createUser(user: UserAttrs, response: Response) {
  await findUserByEmail(user.email)
    .then((rows) => {
      if (rows)
        return response.status(409).json({ error: "Email already exists" });
      else
        return create({
          username: user.username,
          email: user.email,
          password: user.password,
        })
          .then((user) => initializeSession(user.email, response))
          .catch((error) => {
            // TODO: How can a user recover from this error?
            console.error(error);
            return response
              .status(500)
              .json({ error: "Internal server error" });
          });
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Something while creating an account");
    });
}

async function saveCandidateByEmail(email: string, response: Response) {
  await redisStore.client
    .get(`signup:${email}`)
    .then(async (data) => {
      if (data) {
        let { username, email, password } = JSON.parse(data);
        return await createUser({ username, email, password }, response);
      } else
        return response.status(401).json({
          error: "Your session has expired. Please start new signup process",
        });
    })
    .catch(redisError);
}

async function verifyCode(request: Request, response: Response) {
  const { email, code } = request.body;

  await redisStore.client
    .get(`verification:${email}`)
    .then(async (result) => {
      if (!result) {
        return response.status(400).json({
          error:
            "Verification code expired or invalid email. Please request new code",
        });
      }
      if (result !== code)
        return response.status(400).json({ error: "Invalid code" });
      else return await saveCandidateByEmail(email, response);
    })
    .catch(redisError);
}

router.post("/", verifyCode);

export default router;
