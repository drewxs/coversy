const router = require('express').Router();
const {
    getNotifications,
    readNotifications,
    deleteNotification,
} = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/verify');

// READ
router.get('/', verifyToken, getNotifications);

// UPDATE
router.put('/', verifyToken, readNotifications);

// DELETE
router.delete('/:notifId', verifyToken, deleteNotification);

module.exports = router;
