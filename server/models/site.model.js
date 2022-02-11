const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 1,
		max: 128,
	},
	address: {
		street: {
			type: String,
			required: true,
			min: 2,
			max: 256,
		},
		zip: {
			type: String,
			required: true,
			min: 6,
			max: 6,
		},
		city: {
			type: String,
			required: true,
			min: 2,
			max: 64,
		},
		province: {
			type: String,
			required: true,
			enum: [
				'BC',
				'AB',
				'SK',
				'MB',
				'ON',
				'NB',
				'NL',
				'PE',
				'NS',
				'QC',
				'YT',
				'NT',
				'NU',
			],
		},
	},
});

module.exports = mongoose.model('Site', SiteSchema);
