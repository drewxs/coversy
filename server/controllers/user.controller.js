const User = require('../models/user.model');
const escape = require('escape-html');

//READ

/**
 *
 * @desc This function returns all users.
 * @route GET /user/
 * @access Admin
 */
exports.getAllUsers = async (req, res) => {
	User.find()
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function returns users by user id.
 * @route GET /user/:userId
 * @access Admin
 */
exports.getUserById = async (req, res) => {
	const userId = escape(req.params.userId);

	User.findById(userId)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function returns users by site.
 * @route GET /user/:siteid
 * @access Admin
 */
exports.getUsersBySite = async (req, res) => {
	const site = escape(req.params.site);

	User.find(site)
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json(err));
};

//UPDATE

/**
 *
 * @desc This function updates users by id.
 * @route PUT /user/:userId
 * @access Admin
 */
exports.updateUserById = async (req, res) => {
	const updateQuery = {};
	if (req.body.firstName) updateQuery.firstName = escape(req.body.firstName);
	if (req.body.lastName) updateQuery.lastName = escape(req.body.lastName);
	if (req.body.middleInitial)
		updateQuery.middleInitial = escape(req.body.middleInitial);
	if (req.body.phone) updateQuery.phone = escape(req.body.phone);
	if (req.body.email) updateQuery.email = escape(req.body.email);
	if (req.body.avatar) updateQuery.avatar = escape(req.body.avatar);
	if (req.body.bio) updateQuery.bio = escape(req.body.bio);
	if (req.body.verified) updateQuery.verified = escape(req.body.verified);
	if (req.body.site) updateQuery.site = escape(req.body.site);
	const userId = escape(req.params.userId);

	User.findByIdAndUpdate(userId, updateQuery, { new: true })
		.then((user) => {
			if (!user) res.status(404).json('Error: User ID does not exist.');
			res.status(200).json(user);
		})
		.catch((err) => res.status(400).json(err));
};

//DELETE

/**
 *
 * @desc This function deletes users by id.
 * @route DELETE /user/:userId
 * @access Admin
 */
exports.deleteUserById = async (req, res) => {
	const userId = escape(req.params.userId);

	User.findByIdAndDelete(userId)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(400).json(err));
};
