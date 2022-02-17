const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	toggleUserActivatedById,
} = require('../controllers/user.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

router.get('/:userId', getUserById);
router.get('/:siteId', verifyAdmin, getUsersBySite);

router.put('/:userId', verifyUser, updateUserById);
router.put('/:userId/activate', verifyAdmin, toggleUserActivatedById);

module.exports = router;
