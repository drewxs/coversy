const router = require('express').Router();
const {
	getUserById,
	getUsersBySite,
	updateUserById,
	toggleUserActivatedById,
	getProfilePicture,
	updateProfilePicture,
	deleteProfilePicture,
} = require('../controllers/user.controller');
const { uploadProfile } = require('../middleware/profile.uploader');
const { verifyAdmin } = require('../middleware/verify');
const { verifyUser } = require('../middleware/verify.user');

router.get('/:userId', verifyUser, getUserById);
router.get('/site/:siteId', verifyAdmin, getUsersBySite);
router.get('/images/:key', getProfilePicture);

router.put('/:userId', verifyUser, updateUserById);
router.put('/:userId/activate', verifyAdmin, toggleUserActivatedById);
router.put(
	'/:userId/updatepicture',
	uploadProfile.single('avatar'),
	updateProfilePicture
);
router.delete('/:userId/:key/deletepicture', deleteProfilePicture);

module.exports = router;
