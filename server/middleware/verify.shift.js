const jwt = require('jsonwebtoken');
const Shift = require('../models/shift.model');

/** @module middleware */

/**
 * Verifies that the user requesting a shift owns that shift.
 * Route parameters required: shiftId
 *
 * @function verifyShift
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyShift = async (req, res, next) => {
  try {
    const shift = await Shift.findById(req.params.shiftId).lean();

    if (req.user && req.user._id == shift.teacher) next();
    else if (req.user.type === 1 && req.user.site == shift.site) next();
    else return res.status(401).send('Access Denied');
  } catch (err) {
    return res.status(401).send(err);
  }
};

/**
 * Verifies that the user requesting a shift is a sub for that shift.
 * Route parameters required: shiftId
 *
 * @function verifyShiftSub
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyShiftSub = async (req, res, next) => {
  try {
    const shift = await Shift.findById(req.params.shiftId).lean();

    if (req.user && req.user._id == shift.sub) next();
    else if (req.user.type === 1 && req.user.site == shift.site) next();
    else return res.status(401).send('Access Denied');
  } catch (err) {
    return res.status(401).send(err);
  }
};
