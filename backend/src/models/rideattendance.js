'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RideAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RideAttendance.belongsTo(models.Ride, {foreignKey: 'id'});
      RideAttendance.belongsTo(models.User, {foreignKey: 'id'});
      models.Ride.hasMany(RideAttendance);
      models.User.hasMany(RideAttendance);
    }
  }
  RideAttendance.init({
    rideId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    notifications: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RideAttendance',
  });
  

  return RideAttendance;
};