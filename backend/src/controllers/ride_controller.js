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
          res.status(200).json(rides);
        } catch (error) {
          console.error('Error retrieving rides by city:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

    
    async joinRide(req, res) {
        try {
            const rideID = req.params.rideID;
            const userID = req.query.userID;
            const ride = await Ride.findOne({ where: { id: rideID } });

            if (!ride) {
                return res.status(404).json({ error: 'Ride not found' });
            }
            if (ride.attendance === ride.max_attendance) {
                return res.status(403).json({ error: 'No more space in ride' });
            }
            ride.attendance += 1;
            ride.updatedAt = sequelize.fn('NOW');
            await ride.save();
            //Add ride user to ride attendance table
            res.status(200).json({ message: 'Joined ride successfully' }); // Send a response back to the client

        } catch (error) {
          console.error('Error joining ride:', error);
          res.status(500).json({ error: "Internal server error {error}"});
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
        
    },

    async getCities(req,res){
        try{
            const [cities, metadata] = await sequelize.query(`SELECT DISTINCT city FROM rides`);
            const cityValues = cities.map(city => city.city);
            res.status(200).json(cityValues);
        }catch(error){
            console.error('Error retrieving cities:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Implement other controller methods for CRUD operations

};