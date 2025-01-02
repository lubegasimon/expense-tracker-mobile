import models from "../models";

const findCategory = async (name: string) => {
  return await models.Category.findOne({
    where: { name },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

export default findCategory;
