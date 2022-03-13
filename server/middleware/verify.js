const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const escape = require('escape-html');

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
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send(err);
	}
};

/**
 * Verifies whether the user requesting the route is the admin of that site
 * Required parameters: siteId
 */
exports.verifyAdmin = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;

		if (req.user && req.user.type === 1) next();
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send(err);
	}
};
