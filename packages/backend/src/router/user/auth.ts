import { Response } from "express";
import jwt from "jsonwebtoken";
import findUserByEmail from "../../user/find";

async function initializeSession(email: string, response: Response) {
  const JWT_SECRET = process.env.SECRET || "jwt-token";
  const user = await findUserByEmail(email);
  if (!user) {
    response.status(500).json({ error: "Internal Server Error" });
    console.error("Unable to issue token, user ID is missing");
    return;
  }
  const token = jwt.sign({ userID: user.id }, JWT_SECRET, {
    expiresIn: "7 days",
  });
  response.append("Authorization", `Bearer ${token}`);
  return response.status(201).json({
    message: `Successfully signed in`,
    token,
  });
}

export default initializeSession;
