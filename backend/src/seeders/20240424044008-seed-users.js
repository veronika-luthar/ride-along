// Use bycr
'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      const hashedPassword = '123';
  
      await queryInterface.bulkInsert('Users', [
        {
          name: 'John Doe',
          email: 'demo@gmail.com',
          password: bcrypt.hashSync(hashedPassword, 10),
          phone_number: '1234567890',
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Smith',
          email: 'demo2@gmail.com',
          password: bcrypt.hashSync(hashedPassword, 10),
          phone_number: '9876543210',
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          password: hashedPassword,
          phone_number: '5555555555',
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bob Anderson',
          email: 'bob.anderson@example.com',
          password: hashedPassword,
          phone_number: '9999999999',
          public: true, // or false, depending on privacy settings
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };
