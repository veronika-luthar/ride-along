const jwt = require('jsonwebtoken');
const {User,sequelize} = require('./models');
const bcrypt = require('bcrypt');

function generateToken(user) {
  return jwt.sign( {id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

async function authenticateLogin(email_user, password) {
  const user = await User.findOne({ where: { email: email_user } });
  //console.log(user);
  if (!user) {
    //console.log('User not found');
    throw new Error('User not found');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  //console.log(isValidPassword);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  return user;
}

function authenticateToken(req, res, next) {
  //console.log("Authenticating token");
  const authHeader = req.headers['authorization'];
  //console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  //console.log(token);
  if (!token) {
    //console.log("not token");
    return res.sendStatus(401);
  }
  try {
    //console.log("Verificando token");
    req.user = verifyToken(token);
    //console.log("Token verificado");
    //console.log(req.user);
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = { generateToken, verifyToken, authenticateLogin, authenticateToken };


