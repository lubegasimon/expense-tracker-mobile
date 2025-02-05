import { CategoryAttrs } from "../model";
import models from "../../models";

const create = (category: CategoryAttrs) => models.Category.create(category);

export default create;
