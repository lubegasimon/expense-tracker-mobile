import { NextFunction, Request, Response } from "express";
import findUserByEmail from "../../../user/find";
import validateRequest from "../validateRequest";

const validateSignupRequest = () => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    validateRequest("signupBodySchema", request, next);
    const { email } = request.body;
    findUserByEmail(email)
      .then((user) => {
        if (user) return next({ status: 409, message: "Email already exists" });
        return next();
      })
      .catch(next);
  };
};

export default validateSignupRequest;