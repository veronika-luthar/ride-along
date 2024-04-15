const {User, sequelize} = require('../models');


module.exports = {
    async getRidesByCity(req, res) {
        try {
          const city = req.params.city;
          const rides = await getRidesByCityFromDatabase(city);
          res.json(rides);
        } catch (error) {
          console.error('Error retrieving rides by city:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

    
    async joinRide(req, res) {
        
    }
    // Implement other controller methods for CRUD operations

};