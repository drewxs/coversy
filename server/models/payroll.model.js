const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		rate: {
			type: Number,
			required: true,
		},
		hours: {
			type: Number,
			required: true,
		},
		site: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Site',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Payroll', PayrollSchema);
