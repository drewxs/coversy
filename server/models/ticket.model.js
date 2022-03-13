const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
	{
		// 1 : Payroll Issue 2 : Time-Off Request
		ticketType: {
			type: Number,
			required: true,
			min: 1,
			max: 2,
			default: 1,
		},
		message: {
			type: String,
			required: true,
			max: 500,
		},
		resolved: {
			type: Boolean,
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		site: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Site',
			required: true,
		},
		payroll: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payroll',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
