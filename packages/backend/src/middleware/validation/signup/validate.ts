import { NextFunction, Request, Response } from "express";
import validateRequest from "../validateRequest";

const validateSignupRequest =
  () => (request: Request, _response: Response, next: NextFunction) => {
    validateRequest("signupBodySchema", request, next);
  };
export default validateSignupRequest;
