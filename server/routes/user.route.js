const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	deleteUserById,
} = require('../controllers/user.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

router.get('/:userId', getUserById);
router.get('/:siteId', getUsersBySite);

router.put('/:userId', verifyUser, updateUserById);

router.delete('/:userId', verifyAdmin, deleteUserById);

module.exports = router;
