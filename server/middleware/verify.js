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
	} catch (err) {
		return res.status(401).send('Access Denied');
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
		return res.status(401).send('Access Denied');
	}
};

/**
 * Verifies whether the user requesting the route is an admin
 * and they are from the same site
 */
exports.verifyAdmin = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');
	const siteId = req.params.siteId;

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;
		console.log(req.user.site, siteId);

		if (req.user && req.user.type === 1 && req.user.site === siteId) next();
	} catch (err) {
		return res.status(401).send('Access Denied');
	}
};
