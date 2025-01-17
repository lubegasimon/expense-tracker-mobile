import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Categories", "details");
    await queryInterface.addColumn("Categories", "description", {
      type: DataTypes.STRING,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Categories", "details", {
      type: DataTypes.STRING,
    });
  },
};
