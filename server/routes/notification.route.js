const router = require('express').Router();
const {
	getNotificationsByUserId,
	readNotification,
} = require('../controllers/notification.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// READ
router.get('/:userId', verifyUser, getNotificationsByUserId);

// UPDATE
router.post('/:userId/:notificationId', verifyUser, readNotification);

module.exports = router;
