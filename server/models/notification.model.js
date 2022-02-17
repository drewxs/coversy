const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
			max: 128,
		},
		read: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
