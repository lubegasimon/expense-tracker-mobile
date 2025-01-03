import models from "../models";

const updateCategory = async (id: string, name: string, details: string) => {
  return await models.Category.update({ name, details }, { where: { id } });
};

export default updateCategory;
