const router = require('express').Router();
const {
    registerUser,
    login,
    registerSite,
    verifyUser,
    forgotPassword,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register/user', registerUser);
router.post('/register/site', registerSite);
router.post('/forgot', forgotPassword);

router.get('/confirm/:confirmationCode', verifyUser);

module.exports = router;
