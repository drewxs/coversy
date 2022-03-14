const Payroll = require('../models/payroll.model');
const escape = require('escape-html');

/**
 * @desc This function creates a payroll.
 * @route POST /payroll/
 * @access Admin
 */
exports.createPayroll = async (req, res) => {
	const payroll = {
		user: escape(req.body.user),
		rate: escape(req.body.rate),
		hours: escape(req.body.deduction),
		site: escape(req.body.site),
	};

	Payroll.create(payroll)
		.then((payroll) => res.status(200).json(payroll))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns a payroll by the payroll id.
 * @route GET /payroll/:payrollId
 * @access Admin
 */
exports.getPayrollById = async (req, res) => {
	const payrollId = escape(req.params.payrollId);

	Payroll.findById(payrollId)
		.then((payroll) => res.status(200).json(payroll))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns a payroll by the user id.
 * @route GET /payroll/user/:userId
 * @access Admin
 */
exports.getPayrollsByUser = async (req, res) => {
	const user = escape(req.params.userId);

	Payroll.find({ user: user })
		.then((payrolls) => res.status(200).json(payrolls))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates a payroll by the site id.
 * @route GET /payroll/site/siteId
 * @access Admin
 */
exports.getPayrollsBySite = async (req, res) => {
	const site = escape(req.params.siteId);

	Payroll.find({ site: site })
		.then((payrolls) => res.status(200).json(payrolls))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function generates a user payroll report.
 * @route GET /payroll/:payrollId/report
 * @access Admin
 */
exports.generateUserPayrollReport = async (req, res) => {};

/**
 * @desc This function generates a site payroll report.
 * @route GET /payroll/:siteId/report
 * @access Admin
 */
exports.generateSitePayrollReport = async (req, res) => {};

/**
 * @desc This function updates a payroll by the payroll id.
 * @route PUT /payroll/:payrollId
 * @access Admin
 */
exports.updatePayrollById = async (req, res) => {
	const updateQuery = {};
	if (req.body.rate) updateQuery.rate = escape(req.body.rate);
	if (req.body.hours) updateQuery.deduction = escape(req.body.hours);

	const payrollId = escape(req.params.payrollId);

	Site.findByIdAndUpdate(payrollId, updateQuery)
		.then((payroll) => res.status(200).json(payroll))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function deletes a payroll by the payroll id.
 * @route DELETE /payroll/:payrollId
 * @access Admin
 */
exports.deletePayrollById = async (req, res) => {
	const payrollId = escape(req.params.payrollId);

	Site.findByIdAndDelete(payrollId)
		.then((payroll) => res.status(200).json(payroll))
		.catch((err) => res.status(400).json(err));
};
