import { Request, Response, NextFunction } from "express";

interface ApplicationError {
  status: number;
  message: string | { [key: string]: string | undefined };
}
const handleError = (
  error: ApplicationError,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.status(error.status).json({ error: error.message });
  next(error);
};

export default handleError;
