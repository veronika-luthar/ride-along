'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Ratings', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_ratings_user',
      references: {
        table: 'Users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('Ratings', {
      fields: ['reviewerId'],
      type: 'foreign key',
      name: 'fk_ratings_reviewer',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Ratings', 'fk_ratings_user');
    await queryInterface.removeConstraint('Ratings', 'fk_ratings_reviewer');
  }
};
