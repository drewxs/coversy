const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	toggleUserActivatedById,
	getProfilePicture,
	updateProfilePicture,
} = require('../controllers/user.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

router.get('/:userId', getUserById);
router.get('/site/:siteId', verifyAdmin, getUsersBySite);
router.get('/:userId/picture', getProfilePicture);

router.put('/:userId', verifyUser, updateUserById);
router.put('/:userId/:siteId/activate', verifyAdmin, toggleUserActivatedById);
router.put('/:userId/updatepicture', updateProfilePicture);

module.exports = router;
