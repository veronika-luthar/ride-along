const {Ride, sequelize} = require('../models');
const {RideAttendance} = require('../models');
const {User} = require('../models');


module.exports = {
  async createRide(req, res){
    try {
      const ride = await Ride.create({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        estimatedDuration: req.body.estimated_duration,
        city: req.body.city,
        startLocation: req.body.start_location,
        description: req.body.description,
        maxAttendance: req.body.max_attendance
      });
      const test = await RideAttendance.create({
        rideId: ride.id,
        userId: req.user.id,
        isOwner: true,
      });
      res.status(200).json({status: "Success"});
    } catch (err){
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
    //console.log("RIDE " + ride.id);
  },

   
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
            const userID = req.user.id
            const ride = await Ride.findOne({ where: { id: rideID } });

            if (!ride) {
                return res.status(404).json({ error: 'Ride not found' });
            }
            var attendance = await RideAttendance.findAll({
              attributes: [
                [sequelize.fn('COUNT', sequelize.col('rideid')), 'no_of_attendees']
              ],
              where: {
                rideID: rideID
              }
            });
            attendance = attendance[0].dataValues.no_of_attendees;
            console.log(attendance);
            if (attendance=== ride.max_attendance) {
                return res.status(403).json({ error: 'No more space in ride' });
            }
            ride.updatedAt = sequelize.fn('NOW');
            await ride.save();
            await sequelize.query(`INSERT INTO RideAttendances (rideId, userId, notifications,createdAt,UpdatedAt) VALUES (${rideID}, ${userID}, true,NOW(),NOW())`)
            /*await RideAttendance.create({
                rideId: rideID,
                userId: userID,
                notifications: true
            });*/
            //Add ride user to ride attendance table
            res.status(200).json({ message: 'Joined ride successfully' }); // Send a response back to the client

        } catch (error) {
          console.error('Error joining ride:', error);
          res.status(500).json({ error: "Internal server error {error}"});
        }
      },

    async getRides(req, res) {
        try {
          console.log(req.user);
          const rides = await Ride.findAll();
          res.status(200).json(rides);
        } catch (error) {
          console.error('Error retrieving rides:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
        
    },

    async getCities(req,res){
        try{
            const [cities, metadata] = await sequelize.query(`SELECT DISTINCT city FROM Rides`);
            const cityValues = cities.map(city => city.city);
            res.status(200).json(cityValues);
        }catch(error){
            console.error('Error retrieving cities:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getRidesByUser(req,res){
      try{
        const userID = req.user.id;
        const rides = await sequelize.query(`SELECT * FROM Rides WHERE id IN (SELECT rideId FROM RideAttendances WHERE userId = ${userID})`);
        res.status(200).json(rides[0]);
      }
      catch(error){
        console.error('Error retrieving rides by user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    async leaveRide(req, res) {
      try {
          const rideID = req.params.rideID;
          const userID = req.user.id; 
          const ride = await Ride.findOne({ where: { id: rideID } });
          if (!ride) {
              return res.status(404).json({ error: 'Ride not found' });
          }
          ride.updatedAt = sequelize.fn('NOW');
          await ride.save();
          await sequelize.query(`DELETE FROM RideAttendances WHERE rideId = ${rideID} AND userId = ${userID}`);
          res.status(200).json({ message: 'Ride left successfully' }); // Send a response back to the client
      } catch (error) {
        console.error('Error leaving ride:', error);
        res.status(500).json({ error: "Internal server error {error}"});
      }
    },


    async getRideAttendance(req,res){
      const rideID = req.params.rideID;
      try{
        var attendance = await RideAttendance.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('rideid')), 'no_of_attendees']
          ],
          where: {
            rideID: rideID
          }
        });
        attendance = attendance[0].dataValues.no_of_attendees;
        console.log(attendance);
        res.status(200).json(attendance);
      }catch(error){
        console.error('Error retrieving ride attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },


    async getUserInformationForRide(req,res){
      const rideID = req.params.rideID;
      try{
      /*
        var attendance = await User.findAll({
          attributes: [
            'name',
            [
              sequelize.literal(`
              CASE
                WHEN \`User\`.\`public\` = true THEN \`User\`.\`phone_Number\`
                ELSE NULL
              END
            `),
            'phoneNumber'
          ]
          ],
          include: [
            {
              model: RideAttendance,
              where: {
                isOwner: true
              },
            }
          ]
        })*/
        var attendance = await sequelize.query(`SELECT name, isOwner,CASE WHEN public = true THEN phone_number ELSE NULL END AS phoneNumber FROM Users JOIN RideAttendances ON Users.id = RideAttendances.userId WHERE rideId = ${rideID}`);
        console.log(attendance);
        
        res.status(200).json(attendance);
      }catch(error){
        console.error('Error retrieving ride attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },



    // Implement other controller methods for CRUD operations

};