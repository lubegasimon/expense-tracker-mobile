import { UserAttrs, UserInstance, UserModel } from "./model";

export const create = (user: UserAttrs): Promise<UserInstance> => {
  return UserModel.create(user);
};
