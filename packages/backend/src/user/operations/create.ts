import { UserAttrs, UserInstance } from "../model";
import models from "../../models";

const create = async (user: UserAttrs): Promise<UserInstance> => {
  return await models.User.create(user);
};

export default create;
