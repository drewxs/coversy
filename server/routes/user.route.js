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
const verify = require('../middleware/verify');

// READ
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/:siteId', getUsersBySite);

// UPDATE
router.put('/:userId', verify, updateUserById);

// DELETE
router.delete('/:userId', verify, deleteUserById);

module.exports = router;
