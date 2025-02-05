import models from "../../models";

const deleteCategory = (id: string) =>
  models.Category.destroy({ where: { id } });

export default deleteCategory;
