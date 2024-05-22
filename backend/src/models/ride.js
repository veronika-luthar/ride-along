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
        len: {
          args: [2,50],
          msg: "Title must be more than 2 characters and less than 50 characters in length."
        },
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: [dateConstraint()],
          msg: "Date must be at least two days away."
        }
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
        max: {
          args: [10],
          msg: "Estimated duration must be less than 10 hours."
        },
        min: {
          args: [1],
          msg: "Estimated duration must be at least 1 hour."
        }
      }
    },
    city: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          args: [2,100],
          msg: "City must be more than 2 characters and less than 100 characters in length."
        },
      }
    },
    startLocation: {
      type: DataTypes.STRING(250),
      validate: {
        len: {
          args: [2,250],
          msg: "Start location must be more than 2 characters and less than 250 characters in length."
        },
      }
    },
    description: {
      type: DataTypes.STRING(500),
      validate: {
        len: {
          args: [0,500],
          msg: "Description must be less than 500 characters in length."
        },
      }
    },
    maxAttendance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ride',
  });
  return Ride;
};