const router = require('express').Router();
const {
	createPayroll,
	getPayrollById,
	updatePayrollById,
	deletePayrollById,
} = require('../controllers/payroll.controller');

// CREATE
router.post('/', createPayroll);

// READ
router.get('/:payrollId', getPayrollById);

// UPDATE
router.put('/:payrollId', updatePayrollById);

// DELETE
router.delete('/:payrollId', deletePayrollById);

module.exports = router;
