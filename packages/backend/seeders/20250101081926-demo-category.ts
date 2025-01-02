import { QueryInterface } from "sequelize";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Categories", [
      {
        id: uuidv4(),
        name: "Water",
        details: "Water bills",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Categories", {}, {});
  },
};
