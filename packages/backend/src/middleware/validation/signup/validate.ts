import { NextFunction, Request, Response } from "express";
import findUserByEmail from "../../../user/find";
import validateRequest from "../validateRequest";

const validateSignupRequest = (schema: string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const data = request.body;
    validateRequest(schema, request, response);
    const rows = await findUserByEmail(data.email);
    if (!!rows) {
      response.status(409).json({ error: { email: "Email already exists" } });
      return;
    }
    next();
  };
};

export default validateSignupRequest;
