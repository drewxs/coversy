const router = require('express').Router();
const {
	getNotificationById,
	readNotification,
} = require('../controllers/notification.controller');

// READ
router.get('/:notificationId', getNotificationById);

// UPDATE
router.post('/:notificationId', readNotification);

module.exports = router;
