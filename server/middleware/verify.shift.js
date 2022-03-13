const jwt = require('jsonwebtoken');
const Shift = require('../models/shift.model');

/**
 * Verifys that the user requesting a shift owns that shift.
 * Parameters required: teacher
 */
exports.verifyShift = async (req, res, next) => {
	try {
		const shift = await Shift.findById(req.params.shiftId);

		if (req.user && req.user._id == shift.teacher) next();
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send(err);
	}
};
