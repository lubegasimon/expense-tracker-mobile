import { QueryInterface } from "sequelize";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        username: "John",
        email: "john@doe.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
