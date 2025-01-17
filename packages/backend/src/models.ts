import path from "path";
import walkSync from "walk-sync";
import { ModelStatic, Sequelize, Model } from "sequelize";
import databaseConfig from "../config/database.json";
import { safeEnvironment } from "./config";
import { UserModel } from "./user/model";
import { CategoryModel } from "./category/model";
import { ExpenseModel } from "./expense/model";

const config = databaseConfig[safeEnvironment()];

function createSequelizeInstance(config: {
  use_env_variable: string;
}): Sequelize {
  const envVariable = process.env[config.use_env_variable];
  if (!envVariable)
    throw new Error(
      `Environment variable ${config.use_env_variable} is undefined`,
    );
  return new Sequelize(envVariable);
}

const sequelize = createSequelizeInstance(config);

interface CustomModel extends ModelStatic<Model> {
  associate?: (models: { [key: string]: ModelStatic<Model> }) => void;
}

interface Models {
  User: UserModel;
  Category: CategoryModel;
  Expense: ExpenseModel;
  [key: string]: CustomModel;
}

const models: Partial<Models> = {};

const loadModels = (sequelize: Sequelize): Models => {
  const files = walkSync(__dirname, { globs: ["**/*/model.js"] });
  files.forEach((file) => {
    const modelFactory = require(path.join(__dirname, file)).default;
    const model = modelFactory(sequelize);
    models[model.name] = model;
  });
  return models as Models;
};

const associateModels = (models: Models) => {
  Object.keys(models).forEach((name) => {
    const model = models[name];
    if (model.associate) model.associate(models);
  });
};

const getModels = () => {
  const models = loadModels(sequelize);
  associateModels(models);
  return models;
};

export default getModels();
