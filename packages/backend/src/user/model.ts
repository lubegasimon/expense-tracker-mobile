import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const INVALID_USERNAME_FORMAT =
  "Username must be 5-10 characters long and can only contain letters, numbers, and underscores";

export interface UserInstance extends Model<UserAttrs>, UserAttrs {}

export interface UserModel extends ModelStatic<UserInstance> {
  associate?: (models: { [key: string]: ModelStatic<Model> }) => void;
}

type UUID = string;

export interface UserAttrs {
  id?: UUID;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  const User: UserModel = sequelize.define<UserInstance>(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(username: string) {
            const regex = /^[0-9a-zA-Z_]{5,10}$/;
            if (!regex.test(username)) {
              throw new Error(INVALID_USERNAME_FORMAT);
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [5, 256],
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          return hashPassword(user);
        },
      },
    },
  );

  return User;
};

function hashPassword(user: UserAttrs) {
  const saltRounds = 10;
  return bcrypt.hash(user.password, saltRounds).then((hash) => {
    user.password = hash;
  });
}
