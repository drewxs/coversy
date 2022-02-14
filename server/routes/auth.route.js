const router = require('express').Router();
const {
	registerUser,
	login,
	registerSite,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register/user', registerUser);
router.post('/register/site', registerSite);

module.exports = router;
