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
 * @desc This function gets a payroll for a given month.
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

		// Generate shifts for either a site or a user.
		const shifts = site
			? await generateSiteShifts(query)
			: await generateUserShifts(query);

		// Cleaning for individual shift objects to to be pushed into respective timeframes.
		shifts.forEach((shift) => {
			let period = `${new Date(shift.startTime).getFullYear()}-${new Date(
				shift.startTime
			).getMonth()}`;

			// Check if timeframe exists in payrolls.
			let timeframe = payrolls.filter((s) => s.period === period)[0];

			let hours =
				new Date(shift.endTime).getHours() -
				new Date(shift.startTime).getHours();

			// Add additional data for site reports.
			if (site) {
				shift.hours = hours;
				shift.pay = hours * shift.teacher.hourlyRate;
				shift.deductions = shift.pay * (shift.teacher.taxRate / 100);
				shift.netPay = shift.pay - shift.deductions;
			}

			// If timeframe exists, push shift into timeframe, otherwise create timeframe and push shift.
			if (timeframe) {
				timeframe.shifts.push(shift);
			} else {
				payrolls.push({
					period,
					shifts: [shift],
				});
			}
		});

		// Add up totals for each timeframe.
		payrolls.forEach((payroll) => {
			payroll.hours = payroll.shifts.reduce((acc, shift) => {
				return acc + shift.hours;
			}, 0);
			payroll.pay = payroll.shifts.reduce((acc, shift) => {
				return acc + shift.pay;
			}, 0);
			payroll.deductions = payroll.shifts.reduce((acc, shift) => {
				return acc + shift.deductions;
			}, 0);
			payroll.netPay = payroll.shifts.reduce((acc, shift) => {
				return acc + shift.netPay;
			}, 0);
		});

		return res.status(200).json(payrolls);
	} catch (err) {
		return res.status(400).json(err.message);
	}
};

// Generate shifts for a site.
const generateSiteShifts = async (query) => {
	return await Shift.find(query)
		.lean()
		.populate('teacher', 'firstName lastName email hourlyRate taxRate')
		.select('teacher startTime endTime')
		.sort({ startTime: 1 });
};

// Generate shifts for a user.
const generateUserShifts = async (query) => {
	return await Shift.find(query)
		.lean()
		.select('startTime endTime')
		.sort({ startTime: 1 });
};
