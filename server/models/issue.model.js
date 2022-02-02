const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
			max: 500,
		},
		resolved: {
			type: Boolean,
			default: false,
		},
		site: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Site',
			required: true,
		},
		payroll: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payroll',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Issue', IssueSchema);
