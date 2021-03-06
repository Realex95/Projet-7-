const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, procees.env.randomToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User Id invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('requête invalide')
    });
  }
};