import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const JWT_SECRET = process.env.SECRET || "jwt-secret";

function autheticateJwt(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers["authorization"];
  let token = authHeader && authHeader.replace(/Bearer\s+/, "");

  if (!token)
    response.status(401).json({
      error: "Unauthorised access",
      message: "Please login to access this resource.",
    });
  else
    jwt.verify(token, JWT_SECRET, (error, _decoded) => {
      if (error) {
        switch (error.name) {
          case "JsonWebTokenError":
          case "NotBeforeError":
            response.status(403).json({
              error: "JsonWebTokenError or NotBeforeError",
              message: "Something went wrong, please try again",
            });
            return;
          case "TokenExpiredError":
            response.status(403).json({
              error: "TokenExpiredError",
              message: "Your session expired, please login again",
            });
            return;
        }
      } else next();
    });
}
export default autheticateJwt;
