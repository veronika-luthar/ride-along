'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('RideAttendances', 'isOwner', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('RideAttendances', 'isOwner');
  }
};
