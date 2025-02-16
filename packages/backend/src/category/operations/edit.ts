import models from "../../models";
import { CategoryAttrs } from "../model";

const editCategory = (category: CategoryAttrs) => {
  const { id, name, description } = category;
  return models.Category.update({ name, description }, { where: { id } });
};

export default editCategory;
