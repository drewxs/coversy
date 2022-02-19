const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema(
	{
		intendedTeacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		teacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		date: {
			type: Date,
			required: true,
		},
		details: {
			type: String,
			required: true,
		},
		hours: {
			type: Number,
			required: true,
		},
		materials: [
			{
				type: String,
			},
		],
		site: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Site',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Shift', ShiftSchema);
