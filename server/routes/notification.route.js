const router = require('express').Router();
const {
	getNotificationsByUserId,
	readNotification,
} = require('../controllers/notification.controller');
const verifyUser = require('../middleware/verify');

// READ
router.get('/:userId', verifyUser, getNotificationsByUserId);

// UPDATE
router.put('/:userId/:notificationId', verifyUser, readNotification);

module.exports = router;
