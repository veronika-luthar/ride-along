'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('RideAttendances', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_rideattendance_user',
      references: {
        table: 'Users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('RideAttendances', {
      fields: ['rideId'],
      type: 'foreign key',
      name: 'fk_rideattendance_ride',
      references: {
        table: 'Rides',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('RideAttendances', 'fk_rideattendance_ride');
    await queryInterface.removeConstraint('RideAttendances', 'fk_rideattendance_user');
  
    }
  };
