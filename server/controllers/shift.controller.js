const Shift = require('../models/shift.model');
const escape = require('escape-html');

/**
 * @desc This function creates a shift.
 * @route POST /shift/
 * @access Admin
 */
exports.createShift = async (req, res) => {
	const shift = {
		teacher: escape(req.body.teacher),
		startTime: escape(req.body.startTime),
		endTime: escape(req.body.endTime),
		site: escape(req.body.site),
	};
	if (req.body.details) shift.details = escape(req.body.details);

	Shift.create(shift)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns all the shifts.
 * @route GET /shift/
 * @access Admin
 */
exports.getAllShifts = async (req, res) => {
	Shift.find()
		.then((shifts) => res.status(200).json(shifts))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns shifts by the shift Id.
 * @route GET /shift/:shiftId
 * @access Admin
 */
exports.getShiftById = async (req, res) => {
	const shiftId = escape(req.params.shiftId);

	Shift.findById(shiftId)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns shifts by the site.
 * @route GET /shift/:siteId
 * @access Admin
 */
exports.getShiftsBySite = async (req, res) => {
	const site = escape(req.params.siteId);

	Shift.find({ site: site })
		.then((shifts) => res.status(200).json(shifts))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates shifts by the shift Id.
 * @route PUT /shift/:shiftId
 * @access Admin
 */
exports.updateShiftById = async (req, res) => {
	const updateQuery = {};
	if (req.body.teacher) updateQuery.teacher = escape(req.body.teacher);
	if (req.body.sub) updateQuery.sub = escape(req.body.sub);
	if (req.body.details) updateQuery.details = escape(req.body.details);
	if (req.body.startTime) updateQuery.startTime = escape(req.body.startTime);
	if (req.body.endTime) updateQuery.endTime = escape(req.body.endTime);
	if (req.body.posted) updateQuery.posted = escape(req.body.posted);
	if (req.body.site) updateQuery.site = escape(req.body.site);

	const shiftId = escape(req.params.shiftId);

	Shift.findByIdAndUpdate(shiftId, updateQuery)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};
