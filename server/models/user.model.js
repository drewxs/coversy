const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 1,
		max: 64,
	},
	lastName: {
		type: String,
		required: true,
		min: 1,
		max: 64,
	},
	middleInitial: {
		type: String,
		min: 1,
		max: 1,
	},
	// 1: Admin, 2: Teacher/Sub
	type: {
		type: Number,
		required: true,
		min: 1,
		max: 2,
	},
	phone: {
		type: String,
		trim: true,
		min: 10,
		max: 10,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		min: 1,
		max: 64,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 128,
	},
	avatar: {
		type: String,
	},
	bio: {
		type: String,
		max: 500,
	},
	verified: {
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
	},
});

module.exports = mongoose.model('User', UserSchema);
