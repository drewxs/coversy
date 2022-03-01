const router = require('express').Router();
const {
	getNotificationById,
	readNotification,
} = require('../controllers/notification.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// READ
router.get('/:notificationId', verifyUser, getNotificationById);

// UPDATE
router.post('/:notificationId', verifyUser, readNotification);

module.exports = router;
