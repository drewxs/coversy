const router = require('express').Router();
const {
  getSitePayrolls,
  getUserPayrolls,
  getSitePayroll,
  getUserPayroll,
} = require('../controllers/payroll.controller');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

router.get('/site', verifyAdmin, getSitePayrolls);
router.get('/user', verifyToken, getUserPayrolls);
router.get('/site/:date', verifyAdmin, getSitePayroll);
router.get('/user/:date', verifyToken, getUserPayroll);

module.exports = router;
