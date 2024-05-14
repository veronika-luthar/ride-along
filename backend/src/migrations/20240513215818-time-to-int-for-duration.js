'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'estimatedDuration', { type: Sequelize.SMALLINT });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'estimatedDuration', { type: Sequelize.TIME });
  }
};
