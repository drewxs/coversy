const router = require('express').Router();
const { login, register } = require('../controllers/auth.controller');
const verify = require('../middleware/verify');

router.post('/login', login);
router.post('/register', register);
