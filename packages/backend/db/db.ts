import { Sequelize } from "sequelize";
import { databaseUrl } from "../src/config";

export const sequelize = new Sequelize(databaseUrl);
