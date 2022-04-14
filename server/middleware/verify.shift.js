const jwt = require('jsonwebtoken');
const Shift = require('../models/shift.model');

/**
 * Verifys that the user requesting a shift owns that shift.
 * Parameters required: shiftId
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
 * Verifys that the user requesting a shift is a sub for that shift.
 * Parameters required: shiftId
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
