const Notification = require('../models/notification.model');
const escape = require('escape-html');

/**
 * This function creates a notification.
 *
 * @route GET /notification/
 * @access Admin
 */
exports.createNotification = async (sender, receiver, type, ref) => {
    const query = {
        sender: sender,
        receiver: receiver,
        type: type,
        referenceObject: ref,
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
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.user._id,
        })
            .populate('sender', 'firstName lastName email')
            .populate('receiver', 'firstName lastName email')
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
 * @route PUT /notification/
 * @access User
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

exports.deleteNotification = async (req, res) => {
    const notifId = escape(req.params.notifId);
    try {
        const notifications = await Notification.findByIdAndRemove(notifId);
        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
