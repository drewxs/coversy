const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const escape = require('escape-html');

/** @module middleware */

/**
 * Verifies that the user requesting update of a resource is the same as the user that owns the resource.
 * Route parameters required: userId
 *
 * @function verifyUser
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token)
    return res.status(401).send('Unauthenticated. Must be logged in.');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    if (req.user && req.user._id === req.params.userId) next();
    else if (req.user.type === 1) next();
    else return res.status(401).send('Access Denied');
  } catch (err) {
    return res.status(401).send(err);
  }
};
