const {User,Rating, sequelize} = require('../models');
const { generateToken, authenticateLogin, authenticateToken } = require("../auth");
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
      const findUser = await User.findOne({ where: { email: req.body.email } });
      if (findUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const user_instance = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone_number: req.body.phoneNumber,
        public: req.body.isPublic
      });
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  async loginUser(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user_instance = await authenticateLogin(email, password);
      console.log(user_instance);
      console.log("user created");
      const token = generateToken(user_instance);
      console.log("token created");
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  async editProfile(req, res) {
    try {
      console.log(req.body);
      const user = await User.findOne({ where: { id: req.user.id } });
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone_number = req.body.phoneNumber;
      user.public = req.body.isPublic;
      await user.save();
      res.json({ message: 'Profile edited successfully' });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  async getUserRating(req, res) {
    try {
      const userID = req.user.id;
  
      const result = await Rating.findOne({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('no_stars')), 'meanRating']
        ],
        where: {
          userID: userID
        },
        raw: true
      });
  
      if (result) {
        const meanRating = result.meanRating;
        console.log(`Mean rating for userID ${userID}: ${meanRating}`);
        res.status(200).json({ meanRating });
      } else {
        console.log(`No ratings found for userID ${userID}`);
        res.status(404).json({ message: 'No ratings found' });
      }
    } catch (error) {
      console.error('Error calculating mean rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getUserAllRating(req, res) {
    try {
      const userID = req.user.id;
  
      const result = await Rating.findAll({
        where: {
          userID: userID
        }
      });
      console.log(result);
      if (result) {
        console.log(`All ratings for ${userID}: ${result}`);
        res.status(200).json({result });
      } else {
        console.log(`No ratings found for userID ${userID}`);
        res.status(404).json({ message: 'No ratings found' });
      }
    } catch (error) {
      console.error('Error retreiving all ratings:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async isLoggedIn(req, res){
    res.status(200).json({message: 'Success'});
  }
}