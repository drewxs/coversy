const router = require('express').Router();
const {
	createPayroll,
	getPayrollById,
	updatePayrollById,
	deletePayrollById,
} = require('../controllers/payroll.controller');

router.post('/', createPayroll);
router.get('/:payrollId', getPayrollById);
router.put('/:payrollId', updatePayrollById);
router.delete('/:payrollId', deletePayrollById);

module.exports = router;
