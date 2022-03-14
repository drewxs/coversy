const jwt = require('jsonwebtoken');
const Payroll = require('../models/payroll.model');

/**
 * Verifys that the user requesting a payroll owns that payroll.
 * Parameters required: payrollId
 */
exports.verifyPayroll = async (req, res, next) => {
	try {
		const payroll = await Payroll.findById(req.params.payrollId);

		if (req.user && req.user._id == payroll.user) next();
		else return res.status(401).send('Access Denied');
	} catch (err) {
		return res.status(401).send(err);
	}
};
