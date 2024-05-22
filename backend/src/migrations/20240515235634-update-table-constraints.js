'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'title', { 
      type: Sequelize.STRING(50),
      allowNull: false
    });

    await queryInterface.changeColumn('Rides', 'date', { 
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    await queryInterface.changeColumn('Rides', 'time', {
      type: Sequelize.TIME,
      allowNull: false
    });

    await queryInterface.changeColumn('Rides', 'city', { 
      type: Sequelize.STRING(100),
      allowNull: false
    });

    await queryInterface.changeColumn('Rides', 'startLocation', { 
      type: Sequelize.STRING(250),
      allowNull: false
    });

    await queryInterface.changeColumn('Rides', 'description', { 
      type: Sequelize.STRING(500),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rides', 'title', { 
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Rides', 'date', {
      type: Sequelize.DATEONLY, 
      allowNull: true
    });

    await queryInterface.changeColumn('Rides', 'time', { 
      type: Sequelize.TIME,
      allowNull: true
    });

    await queryInterface.changeColumn('Rides', 'city', { 
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Rides', 'startLocation', { 
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Rides', 'description', { 
      type: Sequelize.STRING,
    });
  }
};
