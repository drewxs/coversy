const router = require('express').Router();
const {
	registerUser,
	login,
	registerSite,
	verifyUser,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register/user', registerUser);
router.post('/register/site', registerSite);

router.get('/confirm/:confirmationCode', verifyUser);

module.exports = router;
