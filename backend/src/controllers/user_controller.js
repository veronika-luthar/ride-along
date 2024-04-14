const {User, sequelize} = require('../models');
const { generateToken, authenticate } = require("../auth");
const bcrypt = require('bcrypt');

module.exports = {
  async hi(req, res) {
    try {
      res.json({ message: 'Welcome to Ride Along' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  

  async createUser(req, res) {
    try {
      const user_instance = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone_number: req.body.phone_number,
        public: req.body.public
      });
      const token = generateToken(user_instance);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  async loginUser(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user_instance = await authenticate(email, password);
      const token = generateToken(user_instance);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
  // Implement other controller methods for CRUD operations
};