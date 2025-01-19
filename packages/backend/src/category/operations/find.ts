import models from "../../models";

export const findCategory = async (name: string) => {
  return await models.Category.findOne({
    where: { name },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

export const findCategoryById = async (id: string) => {
  return await models.Category.findByPk(id);
};
