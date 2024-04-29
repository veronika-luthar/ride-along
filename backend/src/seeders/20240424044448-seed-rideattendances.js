'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Create an array of ride attendance objects
    const rideAttendances = [
      {
        rideId: 2,
        userId: 1,
        notifications: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rideId: 1,
        userId: 1,
        notifications: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more ride attendance objects as needed
    ];

    // Insert the ride attendance objects into the database
    await queryInterface.bulkInsert('RideAttendances', rideAttendances);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RideAttendances', null, {});
  },
};
