const Notification = require('../models/notification.model');
const escape = require('escape-html');

/**
 *
 * @desc This function gets a notification by ID.
 * @route GET /notification/:notificationId
 * @access PUBLIC
 */
exports.getNotificationById = async (req, res) => {
	const notificationId = escape(req.params.notificationId);

	Notification.findById(notificationId)
		.then((notification) => res.status(200).json(notification))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function updates the read parameter of a notification.
 * @route POST /notification/:notificationId
 * @access PUBLIC
 */
exports.readNotification = async (req, res) => {
	const updateQuery = {
		read: true,
	};
	const notificationId = escape(req.params.notificationId);

	Notification.findByIdAndUpdate(notificationId, updateQuery)
		.then((notification) => res.status(200).json(notification))
		.catch((err) => res.status(400).json(err));
};
