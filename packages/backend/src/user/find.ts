import { UserModel } from "./model";

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({
    where: { email },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};
