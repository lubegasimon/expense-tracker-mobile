import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  console.log(`Request line: ${req.method} ${req.path} ${req.httpVersion} \n`);

  res.send = function (body) {
    console.log("Response status code:", res.statusCode);
    console.log("Response Body:", body);
    console.log("Session Data:", req.session);
    console.log("Session ID:", req.sessionID);
    console.log("Session Cookie:", req.cookies["session-id-mobile"]);

    return originalSend.call(this, body);
  };
  next();
};
