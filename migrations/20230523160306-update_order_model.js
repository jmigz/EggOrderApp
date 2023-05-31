'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'trayType', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update existing orders with default tray type value
    await queryInterface.sequelize.query(`
      UPDATE "Orders"
      SET "trayType" = '30s'
      WHERE "trayType" IS NULL
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'trayType');
  }
};
