import { UserAttrs, UserInstance } from "../model";
import models from "../../models";

const create = (user: UserAttrs) => models.User.create(user);

export default create;
