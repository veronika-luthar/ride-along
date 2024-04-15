const {User, sequelize} = require('../models');


module.exports = {
    async getRidesByCity(city) {
        try {
          const rides = await Ride.findAll({
            where: {
              city: city
            }
          });
          return rides;
        } catch (error) {
          console.error('Error retrieving rides by city:', error);
          throw error;
        }
      }
};