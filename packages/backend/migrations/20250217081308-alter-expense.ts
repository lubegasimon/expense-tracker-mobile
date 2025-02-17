import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Expenses", "amount");
    await queryInterface.addColumn("Expenses", "amount", {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Expenses", "amount", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
};
