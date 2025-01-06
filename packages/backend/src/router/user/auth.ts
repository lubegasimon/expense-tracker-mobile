import { Response } from "express";
import jwt from "jsonwebtoken";
import findUserByEmail from "../../user/find";
import { secret } from "../../config";

async function initializeSession(email: string, response: Response) {
  const user = await findUserByEmail(email);
  if (!user) {
    response.status(500).json({ error: "Internal Server Error" });
    console.error("Unable to issue token, user ID is missing");
    return;
  }
  const token = jwt.sign({ userID: user.id }, secret, {
    expiresIn: "7 days",
  });
  response.append("Authorization", `Bearer ${token}`);
  return response.status(201).json({
    message: `Successfully signed in`,
    token,
  });
}

export default initializeSession;
