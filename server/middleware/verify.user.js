const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const escape = require('escape-html');

/**
 * Verifies that the user requesting update of a resource is the same as the user that owns the resource.
 * Parameters required: userId
 */
exports.verifyUser = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user && req.user._id === req.params.userId) next();
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send(err);
	}
};
