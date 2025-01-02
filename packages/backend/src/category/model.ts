import { DataTypes, Model, Sequelize } from "sequelize";

export interface CategoryInstance extends Model<CategoryAttrs>, CategoryAttrs {}

type UUID = string;

export interface CategoryAttrs {
  id?: UUID;
  name: string;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  const CategoryModel = sequelize.define<CategoryInstance>("Category", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 256],
      },
    },
  });

  return CategoryModel;
};
