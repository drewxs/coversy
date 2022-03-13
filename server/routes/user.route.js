const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	toggleUserActivatedById,
	getProfilePicture,
	updateProfilePicture,
} = require('../controllers/user.controller');
const { verifyAdmin } = require('../middleware/verify');
const { verifyUser } = require('../middleware/verify.user');
const profileUploader = require('../middleware/profileUploader');

router.get('/:userId', verifyUser, getUserById);
router.get('/site/:siteId', verifyAdmin, getUsersBySite);
router.get('/:userId/picture', getProfilePicture);

router.put('/:userId', verifyUser, updateUserById);
router.put('/:userId/:siteId/activate', verifyAdmin, toggleUserActivatedById);
router.put(
	'/:userId/updatepicture',
	profileUploader.single('avatar'),
	updateProfilePicture
);

module.exports = router;
