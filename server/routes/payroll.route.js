const router = require('express').Router();
const {
	createPayroll,
	getPayrollById,
	getPayrollsByUser,
	getPayrollsBySite,
	generateUserPayrollReport,
	generateSitePayrollReport,
	updatePayrollById,
	deletePayrollById,
} = require('../controllers/payroll.controller');
const { verifyUser } = require('../middleware/verify.user');
const { verifyAdmin } = require('../middleware/verify');
const { verifyPayroll } = require('../middleware/verify.payroll');

// CREATE
router.post('/', createPayroll);

// READ
router.get('/:payrollId', getPayrollById);
router.get('/user/:userId', verifyUser, getPayrollsByUser);
router.get('/site/:siteId', verifyAdmin, getPayrollsBySite);
router.get('/:payrollId/report', verifyPayroll, generateUserPayrollReport);
router.get('/site/:siteId/report', verifyAdmin, generateSitePayrollReport);

// UPDATE
router.put('/:payrollId', updatePayrollById);

// DELETE
router.delete('/:payrollId', deletePayrollById);

module.exports = router;
