const Shift = require('../models/shift.model');
const Rate = require('../models/rate.model');
const escape = require('escape-html');
const { checkRatelogHasPeriod, checkSamePeriod } = require('../util/date.util');

/**
 * This function generates all payrolls from a site.
 *
 * @route GET /payroll/site
 * @access Admin
 */
exports.getSitePayrolls = async (req, res) => {
    const query = { site: req.user.site };
    generateReport(res, query);
};

/**
 * This function generates all payrolls for a user.
 *
 * @route GET /payroll/user
 * @access User
 */
exports.getUserPayrolls = async (req, res) => {
    const query = {
        $or: [{ teacher: req.user._id, sub: null }, { sub: req.user._id }],
    };
    generateReport(res, query);
};

/**
 * This function generates a payroll for a given month (site-wide).
 *
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
    generateReport(res, query);
};

/**
 * This function generates a payroll for a given month.
 *
 * @route GET /payroll/user/:date
 * @access User
 */
exports.getUserPayroll = async (req, res) => {
    const date = new Date(escape(req.params.date));
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const query = {
        $or: [{ teacher: req.user._id, sub: null }, { sub: req.user._id }],
        startTime: { $gte: firstDay, $lt: lastDay },
    };
    generateReport(res, query);
};

/**
 * This function generates a payroll report based on a given query.
 *
 * @returns payrolls array
 */
const generateReport = async (res, query) => {
    try {
        let payrolls = [];

        // Generate shifts based on query
        const shifts = await Shift.find(query)
            .lean()
            .populate('teacher', 'email hourlyRate taxRate')
            .select('teacher startTime endTime')
            .sort({ startTime: 1 });

        // Cleaning for individual shift objects to to be pushed into respective timeframes.
        for (const shift of shifts) {
            let period = `${new Date(shift.startTime).getFullYear()}-${
                new Date(shift.startTime).getMonth() + 1
            }`;
            // Check if timeframe exists in payrolls.
            let timeframe = payrolls.filter((s) => s.period === period)[0];

            let hours =
                new Date(shift.endTime).getHours() -
                new Date(shift.startTime).getHours();

            shift.hours = hours;

            const rate = await Rate.findOne({ user: shift.teacher });

            if (!checkRatelogHasPeriod(rate.ratelog, shift.startTime)) {
                rate.ratelog.push({
                    date: shift.startTime,
                    hourlyRate: shift.teacher.hourlyRate,
                    taxRate: shift.teacher.taxRate,
                });
            }
            await rate.save();

            for (const log of rate.ratelog) {
                if (checkSamePeriod(log.date, shift.startTime)) {
                    shift.pay = hours * log.hourlyRate;
                    shift.deductions = shift.pay * (log.taxRate / 100);
                    shift.netPay = shift.pay - shift.deductions;
                    break;
                }
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
        }

        // Add up totals for each timeframe.
        for (const payroll of payrolls) {
            payroll.hours = 0;
            payroll.pay = 0;
            payroll.deductions = 0;
            payroll.netPay = 0;

            for (const shift of payroll.shifts) {
                payroll.hours += shift.hours;
                payroll.pay += shift.pay;
                payroll.deductions += shift.deductions;
                payroll.netPay += shift.netPay;
            }

            delete payroll.shifts;
        }

        return res.status(200).json(payrolls);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
