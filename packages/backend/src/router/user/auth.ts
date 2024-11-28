import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

function initializeSession(email: string, response: Response) {
  const JWT_SECRET = process.env.SECRET || "jwt-token";
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7 days" });
  response.append("Authorization", `Bearer ${token}`);
  response.status(201).json({
    message: `Successfully signed in`,
    token,
  });
}

export default initializeSession;
