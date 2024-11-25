import { UserAttrs, UserInstance, UserModel } from "./model";

const create = (user: UserAttrs): Promise<UserInstance> => {
  return UserModel.create(user);
};

export default create;
