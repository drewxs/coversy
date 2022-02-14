const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Verifies that the user requesting the route is authenticated.
 */
exports.verifyToken = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user) next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};

/**
 * Verifies that the user requesting update of a resource is the same as the user that owns the resource.
 */
exports.verifyUser = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user && req.user._id === req.params.userId) next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};

/**
 * Verifies whether the user requesting the route is an admin.
 */
exports.verifyAdmin = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user && req.user.type === 1) next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};
