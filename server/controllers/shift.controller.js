const Shift = require('../models/shift.model');

/**
 * NEED TO DO
 * ----------
 * Add document uploads/removals
 * Add input sanitization where applicable
 */

/**
 * @desc This function creates a shift.
 * @route POST /shift/
 * @access Admin
 */
exports.createShift = async (req, res) => {
	Shift.create(req.body)
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
	Shift.findById(req.params.id)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns shifts by the site.
 * @route GET /shift/:siteId
 * @access Admin
 */
exports.getShiftsBySite = async (req, res) => {};

/**
 * @desc This function updates shifts by the shift Id.
 * @route PUT /shift/:shiftId
 * @access Admin
 */
exports.updateShiftById = async (req, res) => {};

/**
 * @desc This function deletes shifts by the shift Id.
 * @route DELETE /shift/:shiftId
 * @access Admin
 */
exports.deleteShiftById = async (req, res) => {};
