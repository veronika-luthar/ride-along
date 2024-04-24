'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Get the user and ride IDs from the database
      const users = await queryInterface.sequelize.query('SELECT id FROM users;');
      const userIds = users[0].map(user => user.id);

      const rides = await queryInterface.sequelize.query('SELECT id FROM rides;');
      const rideIds = rides[0].map(ride => ride.id);

      // Create an array of ride attendance objects
      const rideAttendances = [
        {
          rideId: rideIds[0],
          userId: userIds[0],
          notifications: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rideId: rideIds[1],
          userId: userIds[1],
          notifications: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more ride attendance objects as needed
      ];

      // Insert the ride attendance objects into the database
      await queryInterface.bulkInsert('RideAttendances', rideAttendances);
    } catch (error) {
      console.error('Error seeding RideAttendances:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RideAttendances', null, {});
  },
};
