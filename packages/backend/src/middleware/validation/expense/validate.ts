import { NextFunction, Request, Response } from "express";
import validateRequest from "../validateRequest";

const validateCreateExpenseRequest =
  () => (request: Request, _response: Response, next: NextFunction) => {
    validateRequest("expenseBodySchema", request, next);
  };

export default validateCreateExpenseRequest;
