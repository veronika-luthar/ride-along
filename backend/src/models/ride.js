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
  function dateConstraint(){
    const date = new Date();
    date.setDate(date.getDate()+2);
    return date.toDateString();
  }

  Ride.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      validate: {
        len: [2, 50]
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: dateConstraint()
      }
    }, 
    time: {
      type: DataTypes.TIME,
      validate: {
        timeValidator(value){
          const [hour, minute] = value.split(":");
          const date = new Date(this.date);
          
          const datetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
          const currDate = new Date();
          if((datetime.getTime() - currDate.getTime() < (3600000 * 48))){
            throw new Error("Ride must be scheduled for at least 48 hours from now.");
          }
        }
      }
    },
      estimatedDuration: {
      type: DataTypes.SMALLINT,
      validate: {
        max: 10,
        min: 1
      }
    },
    city: {
      type: DataTypes.STRING(100),
      validate: {
        len: [2,100]
      }
    },
    startLocation: {
      type: DataTypes.STRING(250),
      validate: {
        len: [2,250]
      }
    },
    description: {
      type: DataTypes.STRING(500),
      validate: {
        len: [0,500]
      }
    },
    maxAttendance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};