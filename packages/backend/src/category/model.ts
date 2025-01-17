import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

export interface CategoryInstance extends Model<CategoryAttrs>, CategoryAttrs {}

export interface CategoryModel extends ModelStatic<CategoryInstance> {
  associate?: (models: { [key: string]: ModelStatic<Model> }) => void;
}

type UUID = string;

export interface CategoryAttrs {
  id?: UUID;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  const Category: CategoryModel = sequelize.define<CategoryInstance>(
    "Category",
    {
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
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 256],
        },
      },
    },
  );

  Category.associate = (models) => {
    Category.hasMany(models.Expense, { foreignKey: "categoryId" });
  };

  return Category;
};
