const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	toggleActivateUserById,
} = require('../controllers/user.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

router.get('/:userId', getUserById);
router.get('/:siteId', getUsersBySite);

router.put('/:userId', verifyUser, updateUserById);
router.put('/:userId/activate', verifyAdmin, toggleActivateUserById);

module.exports = router;
