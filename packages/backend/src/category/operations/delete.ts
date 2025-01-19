import models from "../../models";

const deleteCategory = async (id: string) => {
  return await models.Category.destroy({ where: { id } });
};

export default deleteCategory;
