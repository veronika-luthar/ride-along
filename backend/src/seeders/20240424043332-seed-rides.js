'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Rides', [
    {
      city: 'New York',
      description: 'Enjoy a scenic ride through Central Park',
      maxAttendance: 10,
      date: new Date("2024-05-24"),
      time: "9",
      startLocation: 'Central Park Entrance',
      title: 'Central Park Ride',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      city: 'London',
      description: 'Explore the historic streets of London',
      maxAttendance: 15,
      date: new Date("2024-04-24"),
      time: "10",
      startLocation: 'Trafalgar Square',
      title: 'London City Ride',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
},
   down: async (queryInterface, Sequelize)  => {
      await queryInterface.bulkDelete('Rides', null, {});
    },
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
