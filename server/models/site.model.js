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
				'AB',
				'BC',
				'MB',
				'NB',
				'NL',
				'NS',
				'NT',
				'NU',
				'ON',
				'PE',
				'QC',
				'SK',
				'YT',
			],
		},
	},
});

module.exports = mongoose.model('Site', SiteSchema);
