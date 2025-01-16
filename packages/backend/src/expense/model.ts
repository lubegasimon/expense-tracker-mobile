import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

export interface ExpenseInstance extends Model<ExpenseAttrs>, ExpenseAttrs {}

export interface ExpenseModel extends ModelStatic<ExpenseInstance> {
  associate?: (models: { [key: string]: ModelStatic<Model> }) => void;
}

type UUID = string;

export interface ExpenseAttrs {
  id?: UUID;
  name: string;
  amount: number;
  details?: string;
  categoryId?: UUID;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  const Expense: ExpenseModel = sequelize.define<ExpenseInstance>("Expense", {
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 256],
      },
    },
    categoryId: {
      type: DataTypes.UUID,
    },
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.Category, { foreignKey: "categoryId" });
  };

  return Expense;
};
