'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init({
    user_id: DataTypes.INTEGER,
    reviewer_id:{
       type: DataTypes.INTEGER,
        primaryKey: true
    },
    no_stars: DataTypes.INTEGER,
    rideID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};