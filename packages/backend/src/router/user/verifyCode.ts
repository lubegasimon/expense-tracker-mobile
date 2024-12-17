import { Request, Response, Router } from "express";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";
import create from "../../user/create";
import { UserAttrs } from "../../user/model";
import findUserByEmail from "../../user/find";
import initializeSession from "./auth";

const router = Router();

function createUser(user: UserAttrs, response: Response) {
  findUserByEmail(user.email)
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
            response.status(500).send({ error: "Internal server error" });
          });
    })
    .catch(console.error);
}

function saveCandidateByEmail(email: string, response: Response) {
  redisStore.client
    .get(`signup:${email}`)
    .then((data) => {
      if (data) {
        let { username, email, password } = JSON.parse(data);
        return createUser({ username, email, password }, response);
      } else
        return response.status(401).json({
          error: "Your session has expired. Please start new signup process",
        });
    })
    .catch((error) => redisError(error));
}

function verifyCode(request: Request, response: Response) {
  const { email, code } = request.body;

  redisStore.client
    .get(`verification:${email}`)
    .then((result) => {
      if (!result)
        return response.status(400).json({
          error:
            "Verification code expired or invalid email. Please request new code",
        });
      if (result !== code)
        return response.status(400).json({ error: "Invalid code" });
      else return saveCandidateByEmail(email, response);
    })
    .catch((error) => redisError(error));
}

router.post("/", verifyCode);

export default router;
