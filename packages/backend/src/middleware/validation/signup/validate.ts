import { NextFunction, Request, Response } from "express";
import findUserByEmail from "../../../user/find";
import validateRequest from "../validateRequest";

const validateSignupRequest = (schema: string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    validateRequest(schema, request, response);
    const { email } = request.body;

    const rows = await findUserByEmail(email);
    if (rows) {
      response.status(409).json({ error: "Email already exists" });
      return;
    }
    next();
  };
};

export default validateSignupRequest;
