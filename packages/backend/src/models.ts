import path from "path";
import walkSync from "walk-sync";
import { ModelStatic, Sequelize, Model } from "sequelize";
import databaseConfig from "../config/database.json";
import { UserInstance } from "./user/model";
import { safeEnvironment } from "./config";

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

interface Models {
  User: ModelStatic<UserInstance>;
  [key: string]: ModelStatic<Model>;
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

export default loadModels(sequelize);
