const { verifyToken } = require('../utils/auth');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = { authenticateToken };
