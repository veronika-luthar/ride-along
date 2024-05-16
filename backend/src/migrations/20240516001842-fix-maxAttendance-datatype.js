'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'maxAttendance', { 
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'maxAttendance', { 
      type: Sequelize.STRING,
    });
  }
};
