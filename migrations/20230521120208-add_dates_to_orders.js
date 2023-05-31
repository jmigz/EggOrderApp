'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'deliveredAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Orders', 'paidAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'deliveredAt');
    await queryInterface.removeColumn('Orders', 'paidAt');
  }
};
