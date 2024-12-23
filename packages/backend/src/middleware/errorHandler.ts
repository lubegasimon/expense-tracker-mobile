import { Request, Response, NextFunction } from "express";

interface ApplicationError {
  status: number;
  message: string | { [key: string]: string | undefined };
}
const handleError = (
  error: ApplicationError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const status = error.status || 500;
  const errorMessage =
    error.message || "Something went wrong. Please try again";
  response.status(status).json({ error: errorMessage });
};

export default handleError;
