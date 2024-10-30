import { Sequelize, DataTypes } from "sequelize";
import { dbUrl } from "../config";

const sequelize = new Sequelize(dbUrl);

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();
