const Payroll = require('../models/payroll.model');

/**
 * @desc This function creates a payroll.
 * @route POST /payroll/
 * @access Admin
 */
exports.createPayroll = async (req, res) => {};

/**
 * @desc This function returns a payroll by the payroll id.
 * @route GET /payroll/:payrollId
 * @access Admin
 */
exports.getPayrollById = async (req, res) => {};

/**
 * @desc This function updates a payroll by the payroll id.
 * @route PUT /payroll/:payrollId
 * @access Admin
 */
exports.updatePayrollById = async (req, res) => {};

/**
 * @desc This function deletes a payroll by the payroll id.
 * @route DELETE /payroll/:payrollId
 * @access Admin
 */
exports.deletePayrollById = async (req, res) => {};
