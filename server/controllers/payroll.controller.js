const Shift = require('../models/shift.model');
const escape = require('escape-html');

/**
 * @desc This function gets all payrolls from a site.
 * @route GET /payroll/site
 * @access Admin
 */
exports.getSitePayrolls = async (req, res) => {
	const query = { site: req.user.site };
	generateReport(req, res, query, true);
};

/**
 * @desc This function gets all payrolls for a user.
 * @route GET /payroll/user
 * @access User
 */
exports.getUserPayrolls = async (req, res) => {
	const query = {
		$or: [
			{
				teacher: req.user._id,
				sub: null,
			},
			{
				sub: req.user._id,
			},
		],
	};
	generateReport(req, res, query, false);
};

/**
 * @desc This function gets a payroll for a given month (site-wide).
 * @route GET /payroll/site/:date
 * @access Admin
 */
exports.getSitePayroll = async (req, res) => {
	const date = new Date(escape(req.params.date));
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	const query = {
		site: req.user.site,
		startTime: { $gte: firstDay, $lt: lastDay },
	};
	generateReport(req, res, query, true);
};

/**
 * @desc This function gets a payroll for a given month
 * @route GET /payroll/user/:date
 * @access User
 */
exports.getUserPayroll = async (req, res) => {
	const date = new Date(escape(req.params.date));
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	const query = {
		$or: [
			{
				teacher: req.user._id,
				sub: null,
			},
			{
				sub: req.user._id,
			},
		],
		startTime: { $gte: firstDay, $lt: lastDay },
	};

	generateReport(req, res, query, false);
};

// Generate a payroll report.
const generateReport = async (req, res, query, site) => {
	try {
		let payrolls = [];

		const shifts = site
			? await generateSiteShifts(req, res, query)
			: await generateUserShifts(req, res, query);

		shifts.forEach((shift) => {
			let timeframe = `${new Date(
				shift.startTime
			).getFullYear()}-${new Date(shift.startTime).getMonth()}`;
			let payroll = payrolls.filter((s) => s.timeframe === timeframe)[0];

			if (payroll) {
				payroll.shifts.push(shift);
			} else {
				payrolls.push({
					timeframe,
					shifts: [shift],
				});
			}
		});

		payrolls.forEach((payroll) => {
			let hours = payroll.shifts.reduce((acc, shift) => {
				return (
					acc +
					(new Date(shift.endTime).getHours() -
						new Date(shift.startTime).getHours())
				);
			}, 0);
			payroll.hours = hours;
		});

		return res.status(200).json(payrolls);
	} catch (err) {
		return res.status(400).json(err.message);
	}
};

// Generate shifts for a site.
const generateSiteShifts = async (req, res, query) => {
	return await Shift.find(query)
		.lean()
		.populate('teacher', 'firstName lastName email')
		.select('teacher startTime endTime')
		.sort({ startTime: 1 });
};

// Generate shifts for a user.
const generateUserShifts = async (req, res, query) => {
	return await Shift.find(query)
		.lean()
		.select('startTime endTime')
		.sort({ startTime: 1 });
};
