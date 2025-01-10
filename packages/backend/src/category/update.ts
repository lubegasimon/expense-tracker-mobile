import models from "../models";
import { CategoryAttrs } from "./model";

const updateCategory = async (category: CategoryAttrs) => {
  const { id, name, details } = category;
  return await models.Category.update({ name, details }, { where: { id } });
};

export default updateCategory;
