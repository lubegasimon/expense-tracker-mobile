import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import findUserByEmail from "../../../user/operations/find";

const checkEmailExists = () => {
  return (request: Request, _response: Response, next: NextFunction) => {
    const { email, password } = request.body;

    const isPassword = (savedPassword: string) =>
      bcrypt.compare(password, savedPassword);

    findUserByEmail(email)
      .then(async (user) => {
        if (!user)
          return next({
            status: 409,
            message: "No account found with this email",
          });
        if (user.email !== email || !(await isPassword(user.password)))
          return next({ status: 409, message: "Invalid email or password" });
        return next();
      })
      .catch(next);
  };
};

export default checkEmailExists;
