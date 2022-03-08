const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Shift = require('../models/shift.model');
const escape = require('escape-html');

/**
 * Verifys that the user requesting a shift owns that shift.
 * Parameters required: teacher
 */
exports.verifyShift = async (req, res, next) => {
	const token = req.header('shift-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user._id === req.params.teacher) next();
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send('Access Denied');
	}
};
