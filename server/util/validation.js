const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.registerValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().max(64).required(),
		lastName: Joi.string().max(64).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(128).required(),
		site: Joi.objectId(),
		type: Joi.number(),
		activated: Joi.boolean(),
	});
	return schema.validate(data);
};

exports.loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(128).required(),
	});
	return schema.validate(data);
};

exports.updateValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().max(64),
		lastName: Joi.string().max(64),
		middleInitial: Joi.string().min(1).max(1),
		phone: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/),
	});
	return schema.validate(data);
};

exports.siteValidation = (data) => {
	const zipPattern = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;
	const provincePattern = /^(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)$/;

	const schema = Joi.object({
		name: Joi.string().max(128).required(),
		address: {
			street: Joi.string().max(256).required(),
			zip: Joi.string().regex(zipPattern).required(),
			city: Joi.string().max(64).required(),
			province: Joi.string().regex(provincePattern).required(),
		},
	});
	return schema.validate(data);
};
