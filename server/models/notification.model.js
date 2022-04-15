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
        type: {
            type: String,
            enum: ['Shift', 'Payroll', 'TimeOff'],
            required: true,
        },
        referenceObject: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        read: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
