const Notification = require('../models/notification.model');
const escape = require('escape-html');

exports.createNotification = async (sender, receiver, msg) => {
	const query = {
		sender: sender,
		receiver: receiver,
		message: msg,
		read: false,
	};

	try {
		const total = await Notification.find({ receiver: receiver._id })
			.lean()
			.sort('-date');
		if (total.length > 10) {
			await Notification.findByIdAndDelete(total[total.length - 1]._id);
		}

		await Notification.create(query);
	} catch (err) {
		console.log(err);
	}
};

/**
 *
 * @desc This function gets a notification by ID.
 * @route GET /notification/:notificationId
 * @access PUBLIC
 */
exports.getNotifications = (req, res) => {
	Notification.find({ receiver: req.user._id })
		.lean()
		.then((notification) => res.status(200).json(notification))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function updates the read parameter of a notification.
 * @route POST /notification/:notificationId
 * @access PUBLIC
 */
exports.readNotification = (req, res) => {
	const updateQuery = {
		read: true,
	};
	const notificationId = escape(req.params.notificationId);

	Notification.findByIdAndUpdate(notificationId, updateQuery, { new: true })
		.then((notification) => res.status(200).json(notification))
		.catch((err) => res.status(400).json(err));
};
