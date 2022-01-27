const Shift = require('../models/shift.model');

exports.createShift = async (req, res) => {
	Shift.create(req.body)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};

exports.getAllShifts = async (req, res) => {
	Shift.find()
		.then((shifts) => res.status(200).json(shifts))
		.catch((err) => res.status(400).json(err));

	// try {
	// 	const shifts = await Shift.find();
	// 	res.status(200).json(shifts);
	// } catch (err) {
	// 	res.status(400).json(err);
	// }
};

exports.getShiftById = async (req, res) => {
	Shift.findById(req.params.id)
		.then((shift) => res.status(200).json(shift))
		.catch((err) => res.status(400).json(err));
};
