import models from "../models";
import { CategoryAttrs } from "./model";

const updateCategory = async (category: CategoryAttrs) => {
  const { id, name, description } = category;
  return await models.Category.update({ name, description }, { where: { id } });
};

export default updateCategory;
