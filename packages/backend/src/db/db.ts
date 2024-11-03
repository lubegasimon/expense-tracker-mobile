import { Sequelize } from "sequelize";
import { dbUrl } from "../config";

export const sequelize = new Sequelize(dbUrl);
