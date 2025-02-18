import { Request, Response, NextFunction } from "express";

function trimRequestBody(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const body = request.body;
  if (body && typeof body === "object") {
    for (const property in body) {
      const value = body[property];
      if (typeof value === "string") {
        body[property] = value.trim();
      }
    }
  }
  next();
}

export default trimRequestBody;
