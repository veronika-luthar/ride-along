const {Ride, sequelize} = require('../models');


module.exports = {
  async createRide(req, res){
    try {
      await Ride.create({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        estimatedDuration: req.body.estimated_duration,
        city: req.body.city,
        startLocation: req.body.start_location,
        description: req.body.description,
        maxAttendance: req.body.max_attendance
      });
      res.status(200).json({status: "Success"});
    } catch (err){
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

    async getRidesByCity(req, res) {
        try {
          const city = req.params.city;
          const rides = await Ride.findAll({
            where: {
              city: city
            }
          });
          return rides
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
                id: rideID
            }
          });
          if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
          }
          if (ride.attendance == ride.max_attendance) {
            return res.status(400).json({ error: 'No seats available' });
          }
          ride.attendance += 1;
          sequelize.query(
            `UPDATE rides SET attendance = ${ride.attendance} WHERE id = ${rideID}`
          );
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