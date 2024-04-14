const jwt = require('jsonwebtoken');
const {User,sequelize} = require('./models');
const bcrypt = require('bcrypt');

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
async function authenticate(email_user, password) {
  const user = await User.findOne({ where: { email: email_user } });
  if (!user) {
    throw new Error('User not found');
  }
  console.log(user.password);
  console.log(password);
  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log(isValidPassword);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  return user;
}

module.exports = { generateToken, verifyToken, authenticate };