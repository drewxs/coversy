const router = require('express').Router();
const {
    getNotifications,
    readNotifications,
} = require('../controllers/notification.controller');
const { verifyToken } = require('../middleware/verify');

// READ
router.get('/', verifyToken, getNotifications);

// UPDATE
router.put('/', verifyToken, readNotifications);

module.exports = router;
