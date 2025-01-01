import { NextFunction, Request, Response } from "express";
import validateRequest from "../validateRequest";

const validateCreateCategoryRequest = () => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    validateRequest("categoryBodySchema", request, next);
  };
};

export default validateCreateCategoryRequest;
