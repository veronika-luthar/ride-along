'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ride.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    estimatedDuration: DataTypes.TIME,
    city: DataTypes.STRING,
    startLocation: DataTypes.STRING,
    description: DataTypes.STRING,
    maxAttendance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};