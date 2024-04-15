
const express = require('express');
const router = express.Router();
const user_controller = require('./controllers/user_controller.js');
const ride_controller = require('./controllers/ride_controller.js');


router.get('/', user_controller.hi);
router.post('/register', user_controller.createUser);
router.post('/login', user_controller.loginUser);

router.get('/rides', ride_controller.getRides);
router.get('/rides/:city', ride_controller.getRidesByCity);

router.post('/rides/:rideID', ride_controller.joinRide);



module.exports = router;
