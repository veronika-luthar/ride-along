'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reviewerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      no_stars: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rideID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ratings');
  }
};