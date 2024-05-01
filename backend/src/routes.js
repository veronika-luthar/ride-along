
const express = require('express');
const router = express.Router();
const user_controller = require('./controllers/user_controller.js');
const ride_controller = require('./controllers/ride_controller.js');
const { authenticateToken } = require('./auth.js');


router.get('/', user_controller.hi);
router.post('/register', user_controller.createUser);
router.post('/edit_profile', authenticateToken, user_controller.editProfile);
router.post('/login', user_controller.loginUser);
router.get('/get_user', authenticateToken, user_controller.getUser);

router.get('/rides', ride_controller.getRides);

router.get('/rides/:city', ride_controller.getRidesByCity);


router.get('/user/rides',authenticateToken,ride_controller.getRidesByUser);

router.get('/cities', ride_controller.getCities);


router.post('/rides/:rideID/join',authenticateToken, ride_controller.joinRide);

router.post('/create-ride', authenticateToken, ride_controller.createRide);

router.post('/rides/:rideID/leave',authenticateToken,ride_controller.leaveRide); 

router.get('/rides/:rideID/attendance', ride_controller.getRideAttendance); 

router.get('/rides/:rideID/users', ride_controller.getUserInformationForRide); 






module.exports = router;
