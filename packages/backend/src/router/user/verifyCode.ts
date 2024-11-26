import { Request, Response, Router } from "express";
import { redisStore } from "../../middleware/session";
import { redisError } from "./error";
import create from "../../user/create";
import { UserAttrs } from "../../user/model";
import findUserByEmail from "../../user/find";

const router = Router();

function createUser(user: UserAttrs, response: Response) {
  findUserByEmail(user.email)
    .then((rows) => {
      if (rows) response.status(409).json({ error: "Email already exists" });
      else
        create({
          username: user.username,
          email: user.email,
          password: user.password,
        })
          .then((user) =>
            response.status(201).json({
              message: `Account successfully created, welcome ${user.username}!`,
            }),
          )
          .catch((error) => {
            // TODO: How can a user recover from this error?
            console.error(error);
            response.status(500).send({ error: "Internal server error" });
          });
    })
    .catch((error) => console.error(error));
}

function saveCandidateByEmail(email: string, response: Response) {
  redisStore.client
    .get(`signup:${email}`)
    .then((data) => {
      if (data) {
        let { username, email, password } = JSON.parse(data);
        createUser({ username, email, password }, response);
      } else
        response.status(401).json({
          error: "Your session has expired. Please start new signup process",
        });
    })
    .catch((error) => redisError(error));
}

function verifyCode(request: Request, response: Response) {
  const data = request.body;
  redisStore.client
    .get(`verification:${data.code}`)
    .then((result) => {
      if (!result) response.status(400).json({ error: "Invalid code" });
      else saveCandidateByEmail(result, response);
    })
    .catch((error) => redisError(error));
}

router.post("/", verifyCode);

export default router;
