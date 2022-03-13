const router = require('express').Router();
const {
	getNotificationsByUserId,
	readNotification,
} = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/verify');
const { verifyUser } = require('../middleware/verify.user');

// READ
router.get('/user/:userId', verifyUser, getNotificationsByUserId);

// UPDATE
router.put('/:notificationId', verifyToken, readNotification);

module.exports = router;
