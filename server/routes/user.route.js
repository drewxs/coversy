const router = require('express').Router();
const {
	getAllUsers,
	getUserById,
	getUsersBySite,
	updateUserById,
	deleteUserById,
} = require('../controllers/user.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// READ
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/:siteId', getUsersBySite);

// UPDATE
router.put('/:userId', verifyUser, updateUserById);

// DELETE
router.delete('/:userId', verifyAdmin, deleteUserById);

module.exports = router;
