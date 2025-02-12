import { NextFunction, Request, Response } from "express";
import validateRequest from "../validateRequest";

const validateLoginRequest = () => {
  return (request: Request, _response: Response, next: NextFunction) => {
    validateRequest("loginBodySchema", request, next);
  };
};

export default validateLoginRequest;
