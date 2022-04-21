const Notification = require('../models/notification.model');
const escape = require('escape-html');

/** @module notification_controller */

/**
 * This function creates a notification.
 *
 * @function
 * @async
 * @param {Object} sender - Notification sender
 * @param {Object} receiver - Notification receiver
 * @param {String} type - Notification type
 * @param {Object} shift - Shift object
 * @returns {Object} - Created notification
 */
exports.createNotification = async (sender, receiver, type, shift) => {
    const query = {
        sender: sender,
        receiver: receiver,
        type: type,
        shift: shift,
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Notifications for a user
 */
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.user._id,
        })
            .populate('sender', 'firstName lastName email')
            .populate('receiver', 'firstName lastName email')
            .populate('shift', 'startTime endTime')
            .lean();
        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 *
 * This function reads notifications for a user
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Read notifications
 */
exports.readNotifications = async (req, res) => {
    try {
        await Notification.updateMany(
            { receiver: req.user },
            { read: true },
            { new: true }
        );
        return res.status(200).json('Sucessfully read notifications.');
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function deletes a notification
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteNotification = async (req, res) => {
    const notifId = escape(req.params.notifId);
    try {
        const notifications = await Notification.findByIdAndRemove(notifId);
        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
