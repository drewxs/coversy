const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema(
	{
		teacher: {
			type: String,
			required: true,
		},
		sub: {
			type: String,
			required: true,
		},
		details: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Shift', ShiftSchema);
