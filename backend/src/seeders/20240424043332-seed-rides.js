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
  // Can you create two more dummy rides?
  {
    city: 'Paris',
    description: 'Ride through the streets of Paris',
    maxAttendance: 20,
    date: new Date("2023-06-24"),
    time: "11",
    startLocation: 'Eiffel Tower',
    title: 'Paris City Ride',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    city: 'Tokyo',
    description: 'Experience the bustling city of Tokyo',
    maxAttendance: 25,
    date: new Date("2024-07-24"),
    time: "12",
    startLocation: 'Shibuya Crossing',
    title: 'Tokyo City Ride',
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
