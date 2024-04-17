const {Ride, sequelize} = require('../models');


module.exports = {
    async getRidesByCity(req, res) {
        try {
          const city = req.params.city;
          const rides = await Ride.findAll({
            where: {
              city: city
            }
          });
          res.status(400).json(rides);
        } catch (error) {
          console.error('Error retrieving rides by city:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

    
    async joinRide(req, res) {
        try {
          const rideID = req.params.rideID;
          const ride = await Ride.findAll({
            where: {
                ride_id: rideID
            }
          });
          if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
          }
          if (ride.attendance == ride.max_attendance) {
            return res.status(400).json({ error: 'No more space in ride' });
          }
          ride.attendance += 1;
          try{
          await ride.save();
          } catch (error) {
            console.error('Error updating ride attendance:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
          //Add ride user to ride attendance table
          res.status(200);
        } catch (error) {
          console.error('Error joining ride:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

    async getRides(req, res) {
        try {
          const rides = await Ride.findAll();
          res.status(200).json(rides);
        } catch (error) {
          console.error('Error retrieving rides:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
        
    }
    // Implement other controller methods for CRUD operations

};