const router = require('express').Router();
const {
	getNotifications,
	readNotification,
} = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/verify');

// READ
router.get('/', verifyToken, getNotifications);

// UPDATE
router.put('/:notificationId', verifyToken, readNotification);

module.exports = router;
