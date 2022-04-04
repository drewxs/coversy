const router = require('express').Router();
const {
    registerUser,
    login,
    registerSite,
    confirmUser,
    forgotPassword,
    resetPassword,
} = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/verify');

router.post('/login', login);
router.post('/register/user', registerUser);
router.post('/register/site', registerSite);
router.post('/forgot', forgotPassword);

router.get('/confirm/:code', confirmUser);

router.put('/resetpassword/:code', verifyToken, resetPassword);

module.exports = router;
