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
    id:{
     type: DataTypes.INTEGER,
      primaryKey: true,
    } ,
    title: DataTypes.STRING,
    scheduled_time: DataTypes.DATE,
    start_location: DataTypes.STRING,
    city: DataTypes.STRING,
    attendance: DataTypes.INTEGER,
    description: DataTypes.STRING,
    max_attendance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};