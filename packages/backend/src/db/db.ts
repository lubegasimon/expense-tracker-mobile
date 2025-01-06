import { Sequelize } from "sequelize";
import { databaseUrl } from "../config";

export const sequelize = new Sequelize(databaseUrl);
