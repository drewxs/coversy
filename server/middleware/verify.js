const jwt = require('jsonwebtoken');
const User = require('../models/user');

/** @module middleware */

/**
 * Verifies that the user requesting the route is authenticated.
 *
 * @function verifyToken
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Unauthenticated. Must be logged in.');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;

        if (req.user) next();
        else
            return res
                .status(401)
                .send('Access Denied: User is not authenticated.');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/**
 * Verifies whether the user requesting the route is the admin of that site
 *
 * @function verifyAdmin
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Unauthenticated. Must be logged in.');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;

        if (req.user && req.user.type === 1) next();
        else
            return res.status(401).send('Access Denied: User is not an admin.');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/**
 * Verifies whether the user requesting the route is activated.
 *
 * @function verifyActivated
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 */
exports.verifyActivated = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).lean();

        if (user.activated) next();
        else
            return res
                .status(401)
                .send('Access Denied: User is not activated.');
    } catch (err) {
        return res.status(400).send(err);
    }
};
