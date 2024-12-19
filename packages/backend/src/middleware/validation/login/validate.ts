import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import findUserByEmail from "../../../user/find";
import validateRequest from "../validateRequest";

const validateLoginRequest = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    validateRequest("loginBodySchema", request, response);
    const { email, password } = request.body;

    const isPassword = (savedPassword: string) =>
      bcrypt.compare(password, savedPassword);

    const user = await findUserByEmail(email);
    if (!user) {
      response.status(409).json({ error: "No account found with this email" });
      return;
    }
    if (user.email !== email || !(await isPassword(user.password))) {
      response.status(409).json({ error: "Invalid email or password" });
      return;
    }
    next();
  };
};

export default validateLoginRequest;
