import { CategoryAttrs, CategoryInstance } from "../model";
import models from "../../models";

const create = async (category: CategoryAttrs): Promise<CategoryInstance> => {
  return await models.Category.create(category);
};

export default create;
