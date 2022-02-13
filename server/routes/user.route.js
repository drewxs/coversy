const router = require('express').Router();
const {
	registerUser,
	getAllUsers,
	getUserById,
	getUserByEmail,
	getUsersBySite,
	updateUserById,
	deleteUserById,
} = require('../controllers/user.controller');
const verifyToken = require('../middleware/verify.token');

// READ
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/:siteId', getUsersBySite);

// UPDATE
router.put('/:userId', verifyToken, updateUserById);

// DELETE
router.delete('/:userId', verifyToken, deleteUserById);

module.exports = router;
