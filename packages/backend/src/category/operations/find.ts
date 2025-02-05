import models from "../../models";

export const findCategory = (name: string) =>
  models.Category.findOne({
    where: { name },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

export const findCategoryById = (id: string) => models.Category.findByPk(id);
