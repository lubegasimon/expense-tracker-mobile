import models from "../models";

const findCategoryName = async (name: string) => {
  return await models.Category.findOne({
    where: { name },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

export default findCategoryName;
