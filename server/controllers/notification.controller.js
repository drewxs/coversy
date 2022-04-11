const Notification = require('../models/notification.model');
const escape = require('escape-html');

/**
 * This function creates a notification.
 *
 * @route GET /notification/
 * @access Admin
 */
exports.createNotification = async (sender, receiver, title, msg) => {
    const query = {
        sender: sender,
        receiver: receiver,
        title: title,
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
    } catch (err) {}
};

/**
 *
 * This function gets notifications for a user
 *
 * @route GET /notification/
 * @access User
 */
exports.getNotifications = (req, res) => {
    Notification.find({ receiver: req.user._id })
        .lean()
        .then((notification) => res.status(200).json(notification))
        .catch((err) => res.status(400).json(err));
};

/**
 *
 * This function reads notifications for a user
 *
 * @route PUT /notification/
 * @access User
 */
exports.readNotifications = (req, res) => {
    Notification.updateMany(
        { receiver: req.user },
        { read: true },
        { new: true }
    )
        .then((notifications) => res.status(200).json(notifications))
        .catch((err) => res.status(400).json(err));
};
