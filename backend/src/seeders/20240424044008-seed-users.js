'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      const hashedPassword = 123;
  
      await queryInterface.bulkInsert('Users', [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword,
          phone_number: '1234567890',
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: hashedPassword,
          phone_number: '9876543210',
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more user objects as needed
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };
